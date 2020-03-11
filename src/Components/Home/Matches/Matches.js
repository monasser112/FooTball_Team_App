import React from 'react'
import {Tag} from '../../UI/misc'
import Blocks from '../Matches/Blocks'
const Matches = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag 
                  bck="#0d1831"
                  size="50px"
                  color="white"
                >
                matches

                </Tag>

                <Blocks />

                <Tag 
                  bck="#ffffff"
                  size="20px"
                  color="#0d1831"
                  link={true}
                  linkto="/the_team"
                >
                  see more matches...

                </Tag>
            </div>
            
        </div>
    )
}

export default Matches
