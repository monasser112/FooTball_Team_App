import React, { Component } from 'react'
import {easePolyOut} from 'd3-ease'
import Animate from 'react-move/Animate'
import FeaturedPlayer from '../../../Resources/images/featured_player.png'

export default class Text extends Component {

animatePlayer=()=>{
   return(
        <Animate
     show={true}
     start={{
         opacity:0,
         
     }}
     enter={{
         opacity:[1],
         
         timing:{duration:1000,delay:1500,ease:easePolyOut}
     }}
    >
     {({opacity})=>{

       return ( 
           <div className="featured_player"
            style={{
                 opacity,
                 transform:`translate(570px,190px)`,
                 background:`url(${FeaturedPlayer})`
             }}>
             3
         </div>)

     }}
    </Animate>)
}

animateFirst=()=>{
    return( 
      <Animate
        show={true}
        start={{
          opacity:0,
          x:503,
          y:450
         
      }}
      enter={{
          opacity:[1],
          x:[273],
          y:[450],
         
          timing:{duration:1000,ease:easePolyOut}
      }}
     >
      {({opacity,x,y})=>{
 
        return ( 
            <div className="featured_first"
             style={{
                  opacity,
                  transform:`translate(${x}px,${y}px)`
              }}>
              League
          </div>)
 
      }}
     </Animate>)
 }

 animateNumber=()=>{
   return( <Animate
     show={true}
     start={{
         opacity:0,
         rotate:0
     }}
     enter={{
         opacity:[1],
         rotate:[360],
         timing:{duration:1000,ease:easePolyOut}
     }}
    >
     {({opacity,rotate})=>{

       return ( 
           <div className="featured_number"
            style={{
                 opacity,
                 rotate,
                 transform:`translate(290px,170px) rotateY(${rotate}deg)`
             }}>
             3
         </div>)

     }}
    </Animate>)
}




 animateSecond=()=>{
    return( <Animate
      show={true}
      start={{
          opacity:0,
          x:503,
          y:600
         
      }}
      enter={{
          opacity:[1],
          x:[273],
          y:[600],
         
          timing:{duration:1000,ease:easePolyOut}
      }}
     >
      {({opacity,x,y})=>{
 
        return ( 
            <div className="featured_second"
             style={{
                  opacity,
                  transform:`translate(${x}px,${y}px)`
              }}>
              ChampionShips
          </div>)
 
      }}
     </Animate>)
 }







    render() {
        return (
            <div className="featured_text">
              {this.animatePlayer()}
            {this.animateNumber()}
            {this.animateFirst()}
            {this.animateSecond()}
          
                
            </div>
        )
    }
}
