import * as React from 'react'
import axios from 'axios'
import Navbar from '../RepeatingComponents/Navbar'



const showPets = (item) => {
    return (
        <div style={{ display: 'flex', position: 'relative', marginTop: '20px', backgroundColor: 'lightgray', width: '30%', borderRadius: '10px' }}>
            <img style={{ display: 'block', position: 'relative', width: '3cm', height: '3cm', borderRadius: '10px', left: '10%', marginTop: '20px' }} alt='cute dog' src={item.img} />
            <div style={{ display: 'block', position: 'absolute', flexDirection:'column',marginTop: '20px',left:'50%' }} >
                <text style={{ display: 'flex'}} > name: {item.name}  </text>
                <br/>
                <text style={{ display: 'flex'}} > type: {item.type}  </text>
                <br/>
                <text style={{ display: 'flex'}} > age: {item.age} </text>
            </div>
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
    })


    return (
        <div>
            <h1 style={{ display: 'block', position: 'relative', width: '10%', top: '1.5cm', left: '15%' }}>My Pets</h1>
            <div className='general-container'>
                {
                    pets.map(showPets)
                }
                <Navbar />
            </div>
        </div>
    )
}


export default MyPets