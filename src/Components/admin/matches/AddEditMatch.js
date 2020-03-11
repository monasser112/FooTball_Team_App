import React, { Component } from 'react'
import AdminLayout from '../../_Hoc/AdminLayout'
import FormField from '../../UI/FormFields'
import {validate} from '../../UI/misc'
import {firebaseTeams,firebaseDB,firebaseMatches} from '../../../firebase'
import {firebaselooper} from '../../UI/misc'
export default class AddEditMatch extends Component {


    state={
        matchId:'',
        formType:'',
        formError:false,
        formSuccess:'',
        teams:[],
        formdata:{
            date:{
                element:'input',
                value:'',
                config:{
                    label:'Event Date',
                    name:'date_input',
                    type:'date'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },

            local:{
                element:'select',
                value:'',
                config:{
                    label:'Select a local Team',
                    name:'date_input',
                    type:'select',
                    options:[]
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:false
            },
            resultLocal:{
                element:'input',
                value:'',
                config:{
                    label:'Result Local',
                    name:'result_local_input',
                    type:'text',
                   
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:false
            },

            away:{
                element:'select',
                value:'',
                config:{
                    label:'Select an Away Team',
                    name:'date_input',
                    type:'select',
                    options:[]
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:false
            },
            resultAway:{
                element:'input',
                value:'',
                config:{
                    label:'Result Away',
                    name:'result_away_input',
                    type:'text',
                   
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:false
            },

            referee:{
                element:'input',
                value:'',
                config:{
                    label:'Referee',
                    name:'referee_input',
                    type:'text'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },
            stadium:{
                element:'input',
                value:'',
                config:{
                    label:'Stadium',
                    name:'stadium_input',
                    type:'text'
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
               
            },
            result:{
                element:'select',
                value:'',
                config:{
                    label:'Team Result',
                    name:'select_result',
                    type:'select',
                    options:[

                        {key:'W',value:'W'},
                        {key:'L',value:'L'},
                        {key:'D',value:'D'},
                        {key:'n/a',value:'n/a'}

                    ]
                   
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
            },
            final:{
                element:'select',
                value:'',
                config:{
                    label:'Game Played ?',
                    name:'select_played',
                    type:'select',
                    options:[

                        {key:'Yes',value:'Yes'},
                        {key:'No',value:'No'}
                       

                    ]
                   
                   
                },
                validation:{
                    required:true
                   
                },
                
               valid:false,
               validationMessage:'',
               showLabel:true
            },


        }
    }


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

    updateFields(match,teamoptions,teams,type,matchId){

        const newformdata={...this.state.formdata}
       

        

        for(let key in newformdata){
            if(match){
                newformdata[key].value=match[key];
                newformdata[key].valid=true;
            }
             if(key==='local'||key==='away'){
                 newformdata[key].config.options=teamoptions;
             }

            
        }
       this.setState({
           ...this.state,
           matchId,
           formType:type,
           formdata:newformdata,
           teams
       });
    }
    componentDidMount(){
        const matchId=this.props.match.params.id;
        const getTeams=(match,type)=>{
            const teamoptions=[];
            firebaseTeams.once('value').then(snapshot=>{
                const teams=firebaselooper(snapshot);
                 snapshot.forEach(childsnapshot=>{
                     teamoptions.push({
                         key:childsnapshot.val().shortName,
                         value:childsnapshot.val().name
                     })
                 });
                this.updateFields(match,teamoptions,teams,type,matchId)
            })

        }

        
       if(!matchId){
           //Add match
           getTeams(false,'Add Match')
       }else{
           //to get a specif match Id we use firebaseDB
           firebaseDB.ref(`matches/${matchId}`).once('value').then(snapshot=>{
                 const match=snapshot.val();
               getTeams(match,'Edit Match')
           })

       }
    }
    successForm(message){
        this.setState({formSuccess:message});

        setTimeout(()=>{
            this.setState({formSuccess:''});
        },2000)
    }

    submitForm(event){
        event.preventDefault();
        let datatosubmit={};
        let formisvalid=true;
        for(let key in this.state.formdata){
            datatosubmit[key]=this.state.formdata[key].value;
            formisvalid=this.state.formdata[key].valid &&formisvalid
        }
        this.state.teams.forEach(team=>{
            if(team.shortName===datatosubmit.local){
                datatosubmit['localThmb']=team.thmb;
            }
            if(team.shortName===datatosubmit.away){
                datatosubmit['awayThmb']=team.thmb;
            }
        })
        if(formisvalid){
             if(this.state.formType==='Edit Match'){
                 firebaseDB.ref(`matches/${this.state.matchId}`).update(datatosubmit)
                 .then(()=>{
                     this.successForm('Updated Successfully')

                 }).catch(e=>{
                     this.setState({formError:true})
                 })
             }else{
                 firebaseMatches.push(datatosubmit).then(()=>{
                     this.props.history.push('/admin_matches')
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


    render() {
        return (
           <AdminLayout>
           <div className="editmatch_dialog_wrapper">
              <h2>{this.state.formType}</h2>
              <div> 
              
               <form onSubmit={(event)=>this.submitForm(event)}>
               <FormField
                            id={'date'}
                            formdata={this.state.formdata.date}   
                            change={(element)=>this.updateForm(element)}
                            />
               <div className="select_team_layout">
                   <div className="label_inputs">Local</div>
                       <div className="wrapper">
                           <div className="left">
                           <FormField
                            id={'local'}
                            formdata={this.state.formdata.local}   
                            change={(element)=>this.updateForm(element)}
                            />
                           </div>
                           <div>
                           <FormField
                            id={'resultLocal'}
                            formdata={this.state.formdata.resultLocal}   
                            change={(element)=>this.updateForm(element)}
                            />
                           </div>
                       </div>
                   </div>


                <div className="select_team_layout">
                   <div className="label_inputs">Away</div>
                       <div className="wrapper">
                           <div className="left">
                           <FormField
                            id={'away'}
                            formdata={this.state.formdata.away}   
                            change={(element)=>this.updateForm(element)}
                            />
                           </div>
                           <div>
                           <FormField
                            id={'resultAway'}
                            formdata={this.state.formdata.resultAway}   
                            change={(element)=>this.updateForm(element)}
                            />
                           </div>
                       </div>
                   </div>

                <div className="split_fields">
                   <FormField
                            id={'referee'}
                            formdata={this.state.formdata.referee}   
                            change={(element)=>this.updateForm(element)}
                            />

                    <FormField
                            id={'stadium'}
                            formdata={this.state.formdata.stadium}   
                            change={(element)=>this.updateForm(element)}
                            />
                   </div>
            {/* css rule =>
            class Name split_fields and split_fields .last

            is as follows 
            <div className="split_fields">
             <div className="last">
              //styles applies here
             
             </div>
            
            
            </div>

            the above code is the same as follows

            <div className="split_fields last">
             //syles pplies here 
              here we merged the two className (parent and child) 
              in one className
            
            </div>
              
            
             */}
                   <div className="split_fields last">
                   <FormField
                            id={'result'}
                            formdata={this.state.formdata.result}   
                            change={(element)=>this.updateForm(element)}
                            />
                              <FormField
                            id={'final'}
                            formdata={this.state.formdata.final}   
                            change={(element)=>this.updateForm(element)}
                            />
                   </div>
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
