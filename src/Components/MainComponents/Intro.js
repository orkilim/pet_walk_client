import { Button } from '@material-ui/core'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../App.css'

const Intro = () => {


    return (
        <div className="general-container">
            {/*add photo here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <NavLink id='lets-go-button' to='/MyInfo'>
                LET'S GO
            </NavLink>
        </div>
    )
}


export default Intro