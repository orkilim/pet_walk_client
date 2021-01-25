import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { Button, Grid, Input, MenuItem, TextField } from '@material-ui/core';
//import { Label } from '@material-ui/icons';
import '../../App.css'
import { Select } from '@material-ui/core';
import axios from 'axios';



const AddPet = () => {

    const [dogType, setDogType] = React.useState('none')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState()//was empty now starting with 1
    const [dogWeight, setDogWeight] = React.useState()//was empty now starting with 1
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState()//was number switched to string
    const [foodLevel, setFoodLevel] = React.useState()//was number switched to string
    const [dayPlanLevel, setDayPlanLevel] = React.useState()//was number switched to string
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg, setDogImg] = React.useState("")
    
    return (
        <Grid style={{backgroundColor:'lightgray'}}>
            <div id='add-pet-container' /*className='general-container'*/>
                <img alt='dog image' src={dogImg} style={{ display: 'block', width: '100px', height: '100px' }} />
                <Input className='add-pet-input' required={true} type='file' onChange={(event) => { setDogImg(event.target.value) }} />
                <TextField className='add-pet-input' type='text' value={dogName} label='Pet Name...' onChange={(event) => { setDogName(event.target.value) }} />
                <Select className='add-pet-input' value={dogType} onChange={(event) => { setDogType(event.target.value) }}>
                    <MenuItem selected value='none' >dog type</MenuItem>
                    <MenuItem value='German Shephard' >German Shephard</MenuItem>
                    <MenuItem value='Bulldog' >Bulldog</MenuItem>
                    <MenuItem value='Golden Retriever' >Golden Retriever</MenuItem>
                    <MenuItem value='Wienner' >Wienner</MenuItem>
                    <MenuItem value='Shitzu' >Shitzu</MenuItem>
                    <MenuItem value='st. bernard' >St. Bernard</MenuItem>
                </Select>
                <Select className='add-pet-input' value={dogGender} onChange={(event) => { setDogGender(event.target.value) }}>
                    <MenuItem selected value='Male' >Male</MenuItem>
                    <MenuItem value='Female' >Female</MenuItem>
                </Select>
                <div className='add-pet-input' style={{ flexDirection: 'row' }} >
                    <TextField label='age...' className='add-pet-input-side-by-side' type='number'  value={dogAge} onChange={(event) => { setDogAge(event.target.value) }} />
                    <TextField label='weight' className='add-pet-input-side-by-side' type='number' placeholder='KGs' value={dogWeight} onChange={(event) => { setDogWeight(event.target.value) }} />
                </div>
                <TextField multiline={true} rows={2} id="plan-textfield" className='add-pet-input' type='text' value={dogPlan} label='daily plan...' onChange={(event) => { setDogPlan(event.target.value) }} />
                <div className='add-pet-input' style={{ flexDirection: 'row' }} >
                    <TextField label='Day Plan Level...' className='add-pet-input-side-by-side-2' type='number' value={dayPlanLevel} onChange={(event) => { setDayPlanLevel(event.target.value) }} />
                    <TextField label='Food Level...' className='add-pet-input-side-by-side-2' type='number' value={foodLevel} onChange={(event) => { setFoodLevel(event.target.value) }} />
                    <TextField label='Activity Level' className='add-pet-input-side-by-side-2' type='number' value={activityLevel} onChange={(event) => { setActivityLevel(event.target.value) }} />
                </div>
                <TextField multiline={true} rows={2} id="plan-textfield" className='add-pet-input' type='text' value={hobbies}  label='Hobbies...' onChange={(event) => { setHobbies(event.target.value) }} />
                <TextField multiline={true} rows={2} id="plan-textfield" className='add-pet-input' type='text' value={bio} label='Bio...' onChange={(event) => { setBio(event.target.value) }} />
                <Button style={{marginTop:'0.5cm' ,backgroundColor: 'blue', borderRadius: '100px' }} onClick={() => {

                    const age = (Number)(dogAge)
                    const weight = (Number)(dogWeight)
                    const activityLevelAsNum = (Number)(activityLevel)
                    const foodLevelAsNum = (Number)(foodLevel)
                    const dayPlanLvlAsNum = (Number)(dayPlanLevel)

                    const dogData = {
                        "name": dogName,
                        "type": dogType,
                        "age": age,
                        "weight": weight,
                        "gender": dogGender,
                        "activityLevel": activityLevelAsNum,
                        "foodLevel": foodLevelAsNum,
                        "dayPlan": dogPlan,
                        "dayPlanLevel": dayPlanLvlAsNum,
                        "hobbies": hobbies,
                        "bio": bio,
                        "img": dogImg
                    }
                    axios({
                        method: 'post',
                        url: 'https://petwalkapp.herokuapp.com/pets',
                        headers: {
                            "x-auth-token": localStorage["token"]
                        },
                        data: dogData
                    })
                        .then((data) => {
                            console.log(data)
                        })
                        .catch((err) => {
                            if (err)
                                console.log('problem with adding a dog:\n' + err)
                            console.log(dogData)


                        })
                }}>Add Pet</Button>
                <Navbar />
            </div>
        </Grid>
    )
}



export default AddPet