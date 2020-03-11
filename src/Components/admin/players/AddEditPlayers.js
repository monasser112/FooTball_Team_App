import React, { Component } from 'react'
import AdminLayout from '../../_Hoc/AdminLayout'
import FormField from '../../UI/FormFields'
import {validate} from '../../UI/misc'
import { firebasePlayers,firebaseDB , firebase } from '../../../firebase'
import Fileuploader from '../../UI/Fileuploader'
//import firebase from 'firebase'

export default class AddEditPlayers extends Component {

    state={
        playerId:'',
        formType:'',
        formError:false,
        formSuccess:'',
        defaultImg:'',
        formdata:{
           name:{
                element:'input',
                value:'',
                config:{
                    label:'Player Name',
                    name:'name_input',
                    type:'text'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    label:'Player Last Name',
                    name:'lastname_input',
                    type:'text'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },
            number:{
                element:'input',
                value:'',
                config:{
                    label:'Player Number',
                    name:'number_input',
                    type:'text'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },
            position:{
                element:'select',
                value:'',
                config:{
                    label:'Select a Postion',
                    name:'select_position',
                    type:'select',
                    options:[
                        {key:"Keeper",value:"Keeper"},
                        {key:"Defence",value:"Defence"},
                        {key:"Midfield",value:"Midfield"},
                        {key:"Striker",value:"Striker"}



                    ]
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
            },
            image:{
                element:'image',
                value:'',
                validation:{
                    required:true
                },
                valid:false
            }



        }
    }

    updateFields=(player,playerId,formType,defaultImg)=>{

        const newformdata={...this.state.formdata}

        for(let key in newformdata){
            newformdata[key].value=player[key];
            newformdata[key].valid=true;
        }
        this.setState({
            ...this.state,
            playerId,
            formType,
            defaultImg,
            formdata:newformdata
        })

    }
   
    componentDidMount(){
        const playerId=this.props.match.params.id;
        if(!playerId){
            this.setState({
                formType:'Add Player'
            })
        }else{
            firebaseDB.ref(`players/${playerId}`).once('value').then(snapshot=>{
                const playerdata=snapshot.val();
                firebase.storage().ref('players').child(playerdata.image).
                getDownloadURL().then(url=>{
                    this.updateFields(playerdata,playerId,'Edit Player',url)
                }).catch(e=>{
                    this.updateFields(
                        {
                            ...playerdata,
                            image:''
                        },
                        playerId,'Edit Player','')

                })
                
            })

        }
    }

    successForm=(message)=>{
        this.setState({
            formSuccess:message
        });
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            });
        },2000)

    }
    updateForm(element,content=''){
        
        const newformdata={...this.state.formdata}
        const newelement={...newformdata[element.id]}
        if(content===''){
            newelement.value=element.event.target.value;
            newelement.valid=true;
        }
        else{
            newelement.value=content;
        }
        
        const validdata=validate(newelement)
        newelement.valid=validdata[0];
        newelement.validationMessage=validdata[1];
        console.log(validdata)
        newformdata[element.id]=newelement;
        this.setState({...this.state,formdata:newformdata,formError:false})
    }

    submitForm(event){
        event.preventDefault();
        let datatosubmit={};
        let formisvalid=true;
        for(let key in this.state.formdata){
            datatosubmit[key]=this.state.formdata[key].value;
            formisvalid=this.state.formdata[key].valid &&formisvalid
        }
       
        if(formisvalid){
            if(this.state.formType==='Edit Player'){
                firebaseDB.ref(`players/${this.state.playerId}`).update(datatosubmit).
                then(()=>this.successForm('Update Correctly')).catch(e=>{
                    this.setState({formError:true})
                })
            }else{
                firebasePlayers.push(datatosubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch(e=>{
                    this.setState({formError:true})
                })           
            }
          
      }
      else{
        
      
          // this piece of code is very import for updating state of nested objects
          //************************************** */
          this.setState({...this.state,formError:true,formdata:{...this.state.formdata,email:{...this.state.formdata.email,validationMessage:''}}})
      
          //*****************************************8 */
      }
          }
storeFilename=(filename)=>{
 this.updateForm({id:'image'},filename);    
}

  resetImage=()=>{
      const newformdata={...this.state.formdata}
      newformdata['image'].value='';
      newformdata['image'].valid=false;
      this.setState({...this.state,formdata:newformdata,defaultImg:''})

  }

    render() {
        console.log(this.state);
        return (
           <AdminLayout>
               <div className="editplayers_dialog_wrapper">
                   <h2>{this.state.formType}</h2>
                   <div>
                      <form onSubmit={(event)=>this.submitForm(event)}>
                         <Fileuploader
                           dir="players"
                           tag={"Player image"}
                           defaultImg={this.state.defaultImg}
                           defaultImgName={this.state.formdata.image.value}
                            resetImage={this.resetImage}
                            filename={(filename)=>this.storeFilename(filename)}
                         
                         
                          />
                        <FormField 
                           id={'name'}
                           formdata={this.state.formdata.name}
                           change={(element)=>this.updateForm(element)}
                         />

                    
                           <FormField 
                           id={'lastname'}
                           formdata={this.state.formdata.lastname}
                           change={(element)=>this.updateForm(element)}
                         />
                           <FormField 
                           id={'number'}
                           formdata={this.state.formdata.number}
                           change={(element)=>this.updateForm(element)}
                         />
                            <FormField 
                           id={'position'}
                           formdata={this.state.formdata.position}
                           change={(element)=>this.updateForm(element)}
                         />
                          <div className="success_label">{this.state.formSuccess}
                   </div>

                   {this.state.formError?
                   <div className="error_label">
                       Something is Wrong
                   </div>:''}

                   <div className="admin_submit">
                       <button onClick={(event)=>this.submitForm(event)}>
                           {this.state.formType}
                       </button>
                   </div>

                       </form>
                   </div>
               </div>
           </AdminLayout>
        )
    }
}
