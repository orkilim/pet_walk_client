import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { Button, Input, MenuItem, TextField } from '@material-ui/core';
//import { Label } from '@material-ui/icons';
import '../../App.css'
import { Select } from '@material-ui/core';
import axios from 'axios';


const AddPet = () => {

    const [dogType, setDogType] = React.useState('none')
    const [dogName, setDogName] = React.useState('')
    const [dogGender, setDogGender] = React.useState('Male')
    const [dogAge, setDogAge] = React.useState(1)//was empty now starting with 1
    const [dogWeight, setDogWeight] = React.useState(1)//was empty now starting with 1
    const [dogPlan, setDogPlan] = React.useState('')
    const [activityLevel, setActivityLevel] = React.useState(1)//was number switched to string
    const [foodLevel, setFoodLevel] = React.useState(1)//was number switched to string
    const [dayPlanLevel, setDayPlanLevel] = React.useState(1)//was number switched to string
    const [hobbies, setHobbies] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [dogImg,setDogImg]=React.useState("https://media.petnet.co.il/ckFiles/images/Canaan%20Dog.jpg")

    return (

        <div id='add-pet-container' /*className='general-container'*/>
            <img alt='dog image' src={dogImg} style={{display:'block',width:'100px',height:'100px'}} />
            <input className='add-pet-input' type='file' onChange={(event)=>{setDogImg(event.target.value)}} />
            <input className='add-pet-input' type='text' value={dogName} placeholder='pet name...' onChange={(event) => { setDogName(event.target.value) }} />
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
                <input className='add-pet-input-side-by-side' type='number' placeholder='age...' value={dogAge} onChange={(event) => { setDogAge(event.target.value) }} />
                <input className='add-pet-input-side-by-side' type='number' placeholder='weight (in KG)...' value={dogWeight} onChange={(event) => { setDogWeight(event.target.value) }} />
            </div>
            <textarea id="plan-textfield" className='add-pet-input' type='text' value={dogPlan} placeholder='daily plan...' onChange={(event) => { setDogPlan(event.target.value) }} />
            <div className='add-pet-input' style={{ flexDirection: 'row' }} >
                <input className='add-pet-input-side-by-side-2' type='number' placeholder='Day Plan Level' value={dayPlanLevel} onChange={(event) => { setDayPlanLevel(event.target.value) }} />
                <input className='add-pet-input-side-by-side-2' type='number' placeholder='Food Level' value={foodLevel} onChange={(event) => { setFoodLevel(event.target.value) }} />
                <input className='add-pet-input-side-by-side-2' type='number' placeholder='Activity Level' value={activityLevel} onChange={(event) => { setActivityLevel(event.target.value) }} />
            </div>
            <textarea id="plan-textfield" className='add-pet-input' type='text' value={hobbies} placeholder='Hobbies...' onChange={(event) => { setHobbies(event.target.value) }} />
            <textarea id="plan-textfield" className='add-pet-input' type='text' value={bio} placeholder='Bio...' onChange={(event) => { setBio(event.target.value) }} />
            <Button style={{ backgroundColor: 'blue', borderRadius: '100px' }} onClick={() => {
                axios({
                    method: 'post',
                    url: 'https://petwalkapp.herokuapp.com/pets',
                    headers:{
                        "x-auth-token": localStorage["token"]
                    },
                    data: {
                        
                        "name": dogName,
                        "type": dogType,
                        "age": dogAge,
                        "weight": dogWeight,
                        "gender": dogGender,
                        "activityLevel": activityLevel,
                        "foodLevel": foodLevel,
                        "dayPlan": dogPlan,
                        "hobbies": hobbies
                    }
                })
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((err) => {
                        if (err)
                            console.log('problem with adding a dog:\n' + err)
                    })
            }}>Add Pet</Button>
            <Navbar />
        </div>
    )
}



export default AddPet