import React, { Component } from 'react'

import FormField from '../UI/FormFields'
import {validate} from '../UI/misc'
import {firebase} from '../../firebase'

export default class Signin extends Component {

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
            },
            password:{

                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter Your Password'
                },
                validation:{
                    required:true
                },
               valid:false,
               validationMessage:''

            }
        }
    };
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
    submitForm(event){
        event.preventDefault();
        let datatosubmit={};
        let formisvalid=true;
        for(let key in this.state.formdata){
            datatosubmit[key]=this.state.formdata[key].value;
            formisvalid=this.state.formdata[key].valid &&formisvalid
        }
        if(formisvalid){
      firebase.auth().signInWithEmailAndPassword(
          datatosubmit.email,
          datatosubmit.password
      ).then(()=>{
         console.log('user is auth')
      }).catch((error)=>{
          this.setState({
              formError:true
          })
      })
      }else{
        
      
          // this piece of code is very import for updating state of nested objects
          //************************************** */
          this.setState({...this.state,formError:true,formdata:{...this.state.formdata,email:{...this.state.formdata.email,validationMessage:''}}})
      
          //*****************************************8 */
      }
          }


    render() {
        return (
            <div className="container">
               <div className="signin_wrapper" style={{margin:'100px'}}>
                   <form onSubmit={(event)=>this.submitForm(event)}>
                       <h2>Please Login</h2>

                       <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}   
                        change={(element)=>this.updateForm(element)}

                        />
                         <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}   
                        change={(element)=>this.updateForm(element)}

                        />
                         {this.state.formError?<div className="error_label">Something is Wrong ,Try again</div>:null}
                         <button onClick={(event)=>this.submitForm(event)}>submit</button>
                   </form>
               </div>
                
            </div>
        )
    }
}
