import * as React from 'react'
import axios from 'axios'
import Navbar from '../RepeatingComponents/Navbar'
import { Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive'

const showPets = (item) => {
    return (
        <div key={item._id} style={{ display: 'flex', position: 'relative', marginTop: '20px', backgroundImage: 'linear-gradient(to right,gray,lightgray)', width: '30%', borderRadius: '10px', borderStyle: 'solid', borderColor: 'lightskyblue', borderWidth: '5px' }}>
            <img style={{ display: 'block', position: 'relative', width: '3cm', height: '3cm', borderRadius: '10px', left: '10%', marginTop: '20px' }} alt='cute dog' src={item.img} />
            <div style={{ display: 'block', position: 'absolute', flexDirection: 'column', marginTop: '20px', left: '50%' }} >
                <text style={{ display: 'flex' }} > name: {item.name}  </text>
                <br />
                <text style={{ display: 'flex' }} > type: {item.type}  </text>
                <br />
                <text style={{ display: 'flex' }} > age: {item.age} </text>
            </div>
            <NavLink to='/editPet' onClick={()=>{
                localStorage.setItem('dogId', item._id);
            }} style={{ display: 'block', position: 'relative', left: '8cm', top: '1.5cm', width: '20px', height: '20px' }} ><ChevronRightIcon style={{ color: 'blue' }} /></NavLink>
        </div>
    )

}


const MyPets = () => {

    const [pets, setPets] = React.useState([])


    //getting all the data of a specific user

    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'https://petwalkapp.herokuapp.com/pets/ofUser',
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then((data) => {
                setPets(data.data)
                return
            })
            .catch((err) => {
                if (err)
                    console.log(err)

            })
    },[])


    return (

        <div style={{ display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'lightgray' }}>
                <h1 style={{ display: 'block', position: 'absolute', width: '10%', top: '1.5cm', left: '15%' }}>My Pets</h1>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }} /*className='general-container'*/ >
                {
                    pets.map(showPets)
                }
                <NavLink to='/addPet' ><Button style={{ backgroundColor: 'blue', color: 'white', marginTop: '1.5cm', borderRadius: '50%', height: '55px', fontSize: '20px' }} >+</Button></NavLink>
                <Navbar />
            </div>
        </div>

    )
}


export default MyPets



