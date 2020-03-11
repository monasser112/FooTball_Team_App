import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import { CityLogo } from '../UI/icons'

export default class Header extends Component {
    render() {
        return (
            <div >
               <AppBar
                position="fixed"
                style={{
                    backgroundColor:'#98c5e9',
                    boxShadow:'none',
                    padding:'10px 0',
                    borderBottom:'2px solid #00285e',
                    marginBottom:'0px'
                }}
                 >
                   <Toolbar style={{display:'flex'}}>
                      <div style={{flexGrow:'1'}}>
                          <div style={{fontFamily:'Righteous'}} >
                              <CityLogo link={true} linkTo="/" width="50px" height="50px"/>
                          </div>
                      </div>
                   <Link style={{textDecoration:'none',color:'white'}} to="/the_team">
                      <Button className="font_righteous" color="inherit" >The Team</Button>
                   </Link>

                   <Link style={{textDecoration:'none',color:'white'}} to="/the_matches">
                      <Button className="font_righteous" color="inherit" >Matches</Button>
                   </Link>



                      </Toolbar>
                 
               </AppBar>
            </div>
        )
    }
}
