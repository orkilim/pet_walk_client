import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { Button, Input, MenuItem } from '@material-ui/core';
//import { Label } from '@material-ui/icons';
import '../../App.css'
import { Select } from '@material-ui/core';


const AddPet = () => {

    const [dogType,setDogType]=React.useState('none')
    const [dogName,setDogName]=React.useState('')
    const [dogGender,setDogGender]=React.useState('Male')
    const [dogAge,setDogAge]=React.useState('')
    const [dogWeight,setDogWeight]=React.useState('')

    return (
        <div className='general-container'>
            

                <input className='add-pet-input' type='file' />
                <input className='add-pet-input' type='text' value={dogName} placeholder='pet name...' onChange={(event)=>{setDogName(event.target.value)}} />
                <Select className='add-pet-input' value={dogType} onChange={(event)=>{setDogType(event.target.value)}}>
                    <MenuItem selected value='none' >dog type</MenuItem>
                    <MenuItem value='German Shephard' >German Shephard</MenuItem>
                    <MenuItem value='Bulldog' >Bulldog</MenuItem>
                    <MenuItem value='Golden Retriever' >Golden Retriever</MenuItem>
                    <MenuItem value='Wienner' >Wienner</MenuItem>
                    <MenuItem value='Shitzu' >Shitzu</MenuItem>
                    <MenuItem value='st. bernard' >St. Bernard</MenuItem>
                </Select>
                <Select className='add-pet-input' value={dogGender} onChange={(event)=>{setDogGender(event.target.value)}}>
                    <MenuItem selected value='Male' >Male</MenuItem>
                    <MenuItem value='Female' >Female</MenuItem>
                </Select>
                <input className='add-pet-input' type='number' placeholder='age...' value={dogAge} onChange={(event)=>{setDogAge(event.target.value)}} />
                <input className='add-pet-input' type='number' placeholder='weight (in KG)...' value={dogWeight} onChange={(event)=>{setDogWeight(event.target.value)}} />
            
            <Navbar />
        </div>
    )
}



export default AddPet