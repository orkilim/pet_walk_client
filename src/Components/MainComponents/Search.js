import axios from 'axios'
import * as React from 'react'
import Navbar from '../RepeatingComponents/Navbar'
import { Button, Input } from '@material-ui/core';

let dogsImagesArray = []
let key=0

const showImages = (imageLink) => {
        return (
            <img style={{float:'left',marginTop:'10px',marginLeft:'20px',marginRight:'20px',width: 100, height: 100 }} key={key++} src={imageLink} alt='dog image' />
        )
    
    
}


const Search = () => {

    const [dogBreed, setBreed] = React.useState('')
    const [fullArray,setFullArray]=React.useState(false)



    const showImages = (imageLink) => {
        
        return (
            <img style={{float:'left',marginTop:'10px',marginLeft:'20px',marginRight:'20px',width: 100, height: 100 }} key={key++} src={imageLink} alt='dog image' />
        )
}

    return (

        <div>
            <Input type='text' placeholder="dog breed..." onChange={(event) => { setBreed(event.currentTarget.value) }} />
            <Button onClick={async () => {

                await axios({
                    method: "GET",
                    url: `https://dog.ceo/api/breed/${dogBreed}/images`

                    })
                    .then((responseJson) => {

                        if (responseJson.data.status === 'success') {
                            dogsImagesArray = responseJson.data.message
                            setFullArray(true)
                        }
                        
                        
                    })
                    .catch((err) => {
                        if (err){
                            console.log('error is:\n' + err)
                            setFullArray(false)
                        }
                    })

            }}>SEARCH</Button>
            <div>
            {
                fullArray?dogsImagesArray.map(showImages):(<h1>nothing entered in search or no dog of that type</h1>)
            }
            </div>
            <Navbar />
        </div>
    )
}

export default Search



