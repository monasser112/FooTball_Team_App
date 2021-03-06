import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const privateRoutes = ({
    user,
    component:Comp,
    ...rest
}) => {
    return (
       <Route {...rest} component={(props)=>{
           return(
    
              user?<Comp {...props} user={user} />:<Redirect to="sign_in"/>
           
           )
          
       }}/>
    )
}

export default privateRoutes
