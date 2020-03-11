import React from 'react'
import Layout from '../src/Components/_Hoc/Layout'
import {Switch,Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import PrivateRoute from './Components/authRoutes/privateRoutes'
import Signin from './Components/SignIn/Signin'
import Dashboard from './Components/admin/Dashboard'
import PublicRoute from './Components/authRoutes/publicRoutes'
import AdminMatches from './Components/admin/matches/AdminMatches'
import AddEditMatch from './Components/admin/matches/AddEditMatch'
import AdminPlayers from './Components/admin/players/AdminPlayers'
import AddEditPlayers from './Components/admin/players/AddEditPlayers'
import Team from './Components/TheTeam/Team'
import Matches from './Components/TheMatches/Matches'
import NotFound from './Components/UI/Not_found'
const Routes=(props)=>{
    return(
       <Layout>
          <Switch>
        <PrivateRoute {...props}  path="/admin_players/add_players" component={AddEditPlayers} exact/>
        <PrivateRoute {...props}  path="/admin_players/add_players/:id" component={AddEditPlayers} exact />
        <PrivateRoute {...props}  path="/admin_matches/edit_match" component={AddEditMatch} exact/>
        <PrivateRoute {...props}  path="/admin_matches/edit_match/:id" component={AddEditMatch} exact />
        <PrivateRoute {...props} component={AdminPlayers} path="/admin_players" exact />
        <PrivateRoute {...props} component={AdminMatches} path="/admin_matches" exact />
        <PrivateRoute {...props} component={Dashboard} path="/dashboard" exact />
        <PublicRoute  {...props}  restricted={false}  component={Home} path="/" exact/>
        <PublicRoute  {...props}  restricted={false}  component={Team} path="/the_team" exact/>
        <PublicRoute  {...props}  restricted={false}  component={Matches} path="/the_matches" exact/>


        <PublicRoute  {...props}  restricted={true} component={Signin} path="/sign_in" exact/>
        <PublicRoute  {...props}  restricted={false} component={NotFound}  />


         </Switch>
       </Layout>
    )
}
/*
what happens here is that we have two routes private routes and public routes 
and a restricted property if this property set to false user either auth enticated or not authenticated  can go from private route to public route 

private route is the route that is only accessible by an authenticated user 
like if an user is authenticated he can see the dashboard but if he is not authenticated he cant access the route dashboard so if restricted is set to false a user (auth or not )
can access this route

restricted is a property we need in public routes so that we restrict the routes accessible by the authenticated users for example if a user is authenticated and this user routed to sign_in page we need to redirect him into another page because there is no need for an authenticated user to enter to a sign in page while he is already signed in 

but if this property set to false it means that an authenticated user might want to visit a home page for example so there is no restriction here i.e restrict is a property to restricted pages might be visited by only authenticated users
*/
export default Routes