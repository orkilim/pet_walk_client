import * as React from 'react';
import '../../App.css';
import axios from 'axios';
import { Grid } from '@material-ui/core';


const PetProfile = () => {



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
                setDogName(dogInfo.name)
                setDogType(dogInfo.type)
                setDogAge(dogInfo.age)
                setDogWeight(dogInfo.weight)
                setDogGender(dogInfo.gender)
                setActivityLevel(dogInfo.activityLevel)
                setFoodLevel(dogInfo.foodLevel)
                setDogPlan(dogInfo.dayPlan)
                setHobbies(dogInfo.hobbies)

            })
            .catch((err) => {
                if (err)
                    console.log(err)

            })
    }, [])

    return (
        <Grid >
            <div style={{ display:'block',position:'relative',width:'100%',height:'100%',  backgroundColor: 'lightgray' }} >
                <div style={{ display: 'flex', position:'relative' }} >
                    <img alt="my-dog" src={dogImg} style={{display:'block'}} />
                </div>
            </div>
        </Grid>
    )
}


export default PetProfile