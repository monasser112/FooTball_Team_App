import React, { Component } from 'react'
import Stripes from '../../../Resources/images/stripes.png'
import {Tag} from '../../UI/misc'
import HomeCards from './cards'
import Reveal from 'react-reveal/Reveal'

export default class meetPlayers extends Component {
    state={
        show:false
    }


    render() {
        return (
            <Reveal fraction={0.7} onReveal={()=>{
                this.setState({show:true})
            }}>
            <div className="home_meetplayers"
            style={{background:`#ffffff url(${Stripes})`}}
            >
               <div className="container">
                <div className="home_meetplayers_wrapper">
                   <div className="home_card_wrapper">
                       <HomeCards show={this.state.show}/>
                           
                   </div>

         <div className="home_text_wrapper">
            <div>
                   <Tag
                   bck="#0e1731"
                   size="100px"
                   color="#ffffff"
                   add={{
                       marginBottom:'20px'
                   }}
                 
                   >
                         Meet
                   </Tag>
             </div>

             <div>
                   <Tag
                   bck="#0e1731"
                   size="100px"
                   color="#ffffff"
                   add={{
                       marginBottom:'20px'
                   }}
                 
                   >
                         The
                   </Tag>
             </div>

             <div>
                   <Tag
                   bck="#0e1731"
                   size="100px"
                   color="#ffffff"
                   add={{
                       marginBottom:'20px',
                   }}
                
                   >
                         Players
                   </Tag>
             </div>



         </div>


                </div>

               </div>

                
            </div>
    </Reveal>
        )
       
    }
}
