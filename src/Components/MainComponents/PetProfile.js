import * as React from 'react';
import '../../App.css';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import WcIcon from '@material-ui/icons/Wc';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';
import Navbar from '../RepeatingComponents/Navbar';

const PetProfile = () => {


    const [dogId, setDogId] = React.useState("")
    const [dogType, setDogType] = React.useState('none')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState('')
    const [dogWeight, setDogWeight] = React.useState('')
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState(null)
    const [foodLevel, setFoodLevel] = React.useState(null)
    const [dayPlanLevel, setDayPlanLevel] = React.useState(null)
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg, setDogImg] = React.useState("")


    React.useEffect(() => {
        axios({
            method: 'get',
            url: `https://petwalkapp.herokuapp.com/pets/ofUser/${localStorage['dogId']}`,
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then((data) => {

                const dogInfo = data.data[0]
                setDogId(localStorage["dogId"])
                setDogName(dogInfo.name)
                setDogType(dogInfo.type)
                setDogAge(dogInfo.age)
                setDogWeight(dogInfo.weight)
                setDogGender(dogInfo.gender)
                setActivityLevel(dogInfo.activityLevel)
                setFoodLevel(dogInfo.foodLevel)
                setDogPlan(dogInfo.dayPlan)
                setDayPlanLevel(dogInfo.dayPlanLevel)
                setHobbies(dogInfo.hobbies)
                setBio(dogInfo.bio)
                setDogImg(dogInfo.img)
            })
            .catch((err) => {
                if (err)
                    console.log(err)

            })
    }, [])

    return (
        <Grid >
            <div style={{ display: 'block', position: 'relative', width: '100%', height: '100%', backgroundColor: 'lightgray' }} >
                <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <img alt="my-dog" src={dogImg} style={{ display: 'block', position: 'relative', width: '100px', height: '100px' }} />
                    <text><b>{dogName}</b></text>
                </div>
                <div style={{display:'flex',position:'relative', backgroundColor:'gray'}} >
                    <div style={{ display: 'flex', position: 'absolute', left: '20%', width: '175px', flexDirection: 'column' }}>
                        <div style={{ flexDirection: 'row' }}>
                            <NavLink to='/editPet' ><Button style={{ backgroundColor: 'orange', borderRadius: '10px' }}> <CreateIcon /> Edit</Button></NavLink>
                            <NavLink to='/myPets' onClick={() => {
                                axios({
                                    method: 'delete',
                                    url: `https://petwalkapp.herokuapp.com/pets/${dogId}`,
                                    headers: {
                                        "x-auth-token": localStorage["token"]
                                    }
                                })
                                    .then((data) => {
                                        console.log(data)
                                    })
                                    .catch((err) => {
                                        if (err)
                                            console.log("problem with dog deletion:\n" + err)
                                    })
                            }} ><Button style={{ backgroundColor: 'red', borderRadius: '10px' }}> <DeleteIcon /> Delete</Button></NavLink>
                        </div>
                        <div style={{ display: 'flex', position: 'absolute',top:'1cm', flexDirection: 'column' }}>
                            <text className='pet-profile-text'><PetsIcon /> <b>type: {dogType}</b></text>
                            <text> <WcIcon style={{ color: 'skyblue' }} /> gender: {dogGender}</text>
                            <text> <HourglassEmptyIcon style={{ color: 'skyblue' }} /> age: {dogAge} </text>
                            <text> <DirectionsRunIcon style={{ color: 'skyblue' }} /> activity level: {activityLevel} </text>
                            <text> <FastfoodIcon style={{ color: 'skyblue' }} /> food level: {foodLevel} </text>
                            <text> <FavoriteIcon style={{ color: 'skyblue' }} /> day plan level: {dayPlanLevel} </text>
                        </div>
                    </div>
                    <div style={{ display: 'flex', position: 'absolute',right: '20%',flexDirection:'column' }} >
                        <label>Hobbies:</label>
                        <text>{hobbies}</text>
                        <label>Bio:</label>
                        <text>{bio}</text>
                        <label>Day Plan:</label>
                        <text>{dogPlan}</text>
                    </div>
                </div>
            </div>
            <Navbar />
        </Grid>
    )
}


export default PetProfile