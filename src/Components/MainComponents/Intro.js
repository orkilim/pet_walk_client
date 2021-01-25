import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../App.css'

const Intro = () => {
    return (
        <div className="general-container" style={{position:'absolute'}} >
            <img alt="walking with dog image" src='../../images/logo.png' />
            <img alt="walking with dog image" src='../../images/dogWalker.png' />
            <NavLink id='lets-go-button' to='/login'>
                LET'S GO
            </NavLink>
        </div>
    )
}


export default Intro