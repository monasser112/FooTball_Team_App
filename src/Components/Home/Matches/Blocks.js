import React, { Component } from 'react'
import {firebaseMatches} from '../../../firebase'
import {firebaselooper} from '../../UI/misc'
import {reverseArray} from '../../UI/misc'
import MatchesBlock from '../../UI/Matches_blocks'
import Slide from 'react-reveal/Slide'
export default class Blocks extends Component {
    state={
        matches:[]
    }



    componentDidMount(){
        firebaseMatches.limitToLast(6).once('value').then(snapshot=>{
            const matches=firebaselooper(snapshot);
            this.setState({
                matches:reverseArray(matches)
            })
        })
    }
    showMatches=(matches)=>(
     
        matches?
          matches.map(match=>(
            <Slide bottom key={match.id}>
               <div className="item">
                    <div className="wrapper">
                    <MatchesBlock match={match}/>
                    </div>

               </div>
           </Slide>
          )
          
          ):null
   
    )
  

    render() {
        console.log(this.state.matches)
        return (
            <div className="home_matches">
            {this.showMatches(this.state.matches)}
                
            </div>
        )
    }
}
