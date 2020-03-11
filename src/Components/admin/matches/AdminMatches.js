import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../_Hoc/AdminLayout'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {firebaseMatches} from '../../../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';

import {firebaselooper} from '../../UI/misc'
import {reverseArray} from '../../UI/misc'
export default class AdminMatches extends Component {
    state={
        isLoading:true,
        matches:[]
    }
    componentDidMount(){
        firebaseMatches.once('value').then(snapshot=>{
            const matches=firebaselooper(snapshot);
            this.setState({
                isLoading:false,
                matches:reverseArray(matches)
            });
        })
    }
    render() {
        console.log(this.state)

//use styled component to syle TabeRow 
        
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.matches.map((match,i)=>(
                                        <TableRow>
                                            <TableCell style={{fontFamily:'Righteous',fontSize:'18px'}}>>{match.date}</TableCell>
                                            <TableCell style={{fontFamily:'Righteous',fontSize:'18px'}}>
                                                <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                 {match.away}<strong>-</strong>{match.local}
                                                </Link>
                                            </TableCell>
                                            <TableCell style={{fontFamily:'Righteous',fontSize:'18px'}}>
                                                {match.resultAway}<strong>-</strong>{match.resultLocal}
                                            </TableCell>
                                            <TableCell style={{fontFamily:'Righteous',fontSize:'18px'}}>
                                                {
                                                 match.final==='Yes'?
                                                  <span className="matches_tag_red">Final</span>
                                                  :
                                                  <span className="matches_tag_green">Not Played Yet</span>
                                                
                                                
                                                
                                                }
                                            </TableCell>


                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>


                </div>








                   <div className="admin_progress">
             {this.state.isLoading?<CircularProgress />:null} 
                   </div>
            </AdminLayout>
        )
    }
}
