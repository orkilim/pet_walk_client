import * as React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


const Navbar = () => {

    return (
        <div id="bottom-nav">
            <NavLink to='/myInfo'><HomeIcon color='primary' /></NavLink>
            <NavLink to='/myPets'><PetsIcon color='primary' /></NavLink>
            <NavLink to='/profile'><AccountCircleIcon color='primary' /></NavLink>
            <NavLink to='/search'><SearchIcon color='primary' /></NavLink>
            <NavLink to='/settings'><SettingsIcon color='primary' /></NavLink>
        </div>
    )
}

export default Navbar