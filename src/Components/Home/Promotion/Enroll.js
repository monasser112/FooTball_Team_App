import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../UI/FormFields'
import {validate} from '../../UI/misc'
import {firebasePromotions} from '../../../firebase'
export default class Enroll extends Component {

    state={
        formError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter Your Email'
                },
                validation:{
                    required:true,
                    email:true
                },
               valid:false,
               validationMessage:''
            }
        }
    };

    successMessage(){
        setInterval(()=>this.setState({formSuccess:''}),2000)
    }

    resetFormSuccess(type){
        const newformdata={...this.state.formdata}

        for (let key in newformdata){
            newformdata[key].value='';
            newformdata[key].valid=false;
            newformdata[key].validationMessage=''
        }

        this.setState({...this.state,formError:false,formSuccess:type?'Congratulations':'Already Present'});
        this.successMessage();
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
  firebasePromotions.orderByChild('email').equalTo(datatosubmit.email).once('value')
  .then(snapshot=>{
      if(snapshot.val()===null){
          firebasePromotions.push(datatosubmit);
          this.resetFormSuccess(true)
      }
      else{
          this.resetFormSuccess(false)

      }
  })
  //this.resetFormSuccess()
}else{
  

    // this piece of code is very import for updating state of nested objects
    //************************************** */
    this.setState({...this.state,formError:true,formdata:{...this.state.formdata,email:{...this.state.formdata.email,validationMessage:''}}})

    //*****************************************8 */
}
    }

    //when accessing object inside object we use parentobject[childobject]

    //when accessing property inside object we use object.property
    updateForm(element){
        
        const newformdata={...this.state.formdata}
        const newelement={...newformdata[element.id]}
        newelement.value=element.event.target.value;
        const validdata=validate(newelement)
        newelement.valid=validdata[0];
        newelement.validationMessage=validdata[1];
        console.log(validdata)
        newformdata[element.id]=newelement;
        this.setState({...this.state,formdata:newformdata,formError:false})
    }

    render() {
        return (
        <Fade>
            <div className="enroll_wrapper">
               <form onSubmit={(event)=>this.submitForm(event)}>
                   <div className="enroll_title">
                       Enter Your Email
                   </div>

                   <div className="enroll_input">
                       <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}   
                        change={(element)=>this.updateForm(element)}

                        />
                        {this.state.formError?<div className="error_label">Something is Wrong ,Try again</div>:null}
                        <div className="success_label">{this.state.formSuccess}</div>
                        <button onClick={(event)=>this.submitForm(event)}>Enroll</button>
                        <div className="enroll_discl">Adipisicing nostrud ea officia aliquip commodo. Amet laboris occaecat labore elit duis et deserunt deserunt do sunt officia occaecat enim adipisicing. Esse </div>
                   </div>
               </form>

                
            </div>
        </Fade>
        )
        
    }
}
