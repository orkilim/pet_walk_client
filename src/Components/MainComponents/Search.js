import axios from 'axios'
import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { Input } from '@material-ui/core';

let dogsImagesArray = []
let fullArray = false

const showImages = (imageLink) => {
    if (fullArray) {
        return (
            <img style={{width:100,height:100}} src={imageLink} alt='dog image' />
        )
    }
    else{
        return <text>problem with playing fetch...ing the images</text>
    }
}


const Search = () => {

    const [dogBreed, setBreed] = React.useState('')

    axios({
        method: "GET",
        url: `https://dog.ceo/api/breed/${dogBreed}/images`

    })
        .then((responseJson) => {
                fullArray = true
                dogsImagesArray = responseJson.data.message
        })
        .catch((err)=>{
            if(err)
                console.log('error is:\n'+err)
        })



    return (

        <div>
            <Input type='text' placeholder="dog breed..." onChange={(event) => {setBreed(event.currentTarget.value) }} />
            <div style={{justifyContent:'flex-start'}}>
            {

                dogsImagesArray.map(showImages)

            }
            </div>
            <Navbar />
        </div>
    )
}

export default Search




/*
{
                axios.get(`/dog.ceo/api/breed/${dogBreed}/images`)
                    .then((responseJson) => {
                        if (responseJson.status !== 'success')
                            return <text>a problem has occured</text>
                        else {
                            responseJson.message.map(showImages())
                        }
                    })
            }
            <Navbar />
*/


/*
{
                axios({
                    method:"GET",
                    url:`/dog.ceo/api/breed/${dogBreed}/images`

                })
                .then((responseJson)=>{
                    if(responseJson.data.status!=='success')
                    {
                        return <text>problem with fetching...the images</text>
                    }
                    else{
                        responseJson.data.message.map(showImages())
                    }
                })
            }
             */