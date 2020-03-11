import React from 'react'
import Featured from './Featured/Featured'
import Matches from './Matches/Matches'
import MeetPlayers from './meetPlayers/meetPlayers'
import Promotion from './Promotion/Promotion'
export default function Home() {
    return (
        <div className="bck_blue">
             <Featured />
             <Matches />
             <MeetPlayers />
             <Promotion />
            
        </div>
    )
}
