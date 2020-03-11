import React, { Component } from 'react'
import {firebase, firebaseMatches} from '../../firebase'
import FileUploader from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class Fileuploader extends Component {

    state={
        name:'',
        isUploading:false,
        fileURL:''
    }
    //if you will add a new player of course defaultImg will be empty as well as the name ,but if you edit player you want to know if there is a default image or not
    //side node : default image is the image of the player in the upload 
    
    handleUploadStart=()=>{
        this.setState({isUploading:false})
    }

    handleUploadError=()=>{
        this.setState({
            isUploading:false
        })
    }

    handleUploadSuccess=(filename)=>{
        console.log(filename)
  this.setState({
      ...this.state,
      name:filename,
      isUploading:false
  });
  firebase.storage().ref(this.props.dir).child(filename).getDownloadURL().then(url=>{
      console.log(url);
      this.setState({fileURL:url})
  })
  this.props.filename(filename)//filename = storefilename function
    }


    uploadAgain=()=>{
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        })
        this.props.resetImage()
    }

    static getDerivedStateFromProps(props,state){
        if(props.defaultImg){
            return state={
                name:props.defaultImgName,
                fileURL:props.defaultImg
            }
        }
        return null
    }
    render() {
        return (
            <div>
            {!this.state.fileURL? // here we are checking if there is no fileURl it means that there is no defaultIMG which means that we need to show FileUploader component to start uploading the image ,but if there is a fileURL in the state it means that we have uploaded file 
            <div className="label_inputs">{this.props.tag}
               <FileUploader 
                  accept="image/*"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage().ref(this.props.dir)}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  />
                 </div>

               :null}
               {
                   this.state.isUploading?
                     <div style={{textAlign:'center',margin:'30px 0'}} className="progress">
                         <CircularProgress 
                         style={{color:'#98c6e9'}}
                          thickness={7} 
                          />
                     </div>
                   
                   
                   :null
               }
               {
                   this.state.fileURL?
                    <div className="image_upload_container">
                        <img 
                            style={{width:'100%'}}
                            src={this.state.fileURL}
                            alt={this.state.filename}
                        
                        />
                        <div
                         className="remove"
                          onClick={()=>this.uploadAgain()}
                          >
                          Remove
                        </div>
                      

                    </div>
                   
                   :null
               }

            
            
           
                
            </div>
        )
    }
}
