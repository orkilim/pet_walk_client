import * as React from 'react'
import axios from 'axios'
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';
import { Button, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link, NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive'
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';



const showPets = (item) => {
    let age = (item.age === undefined) ? "Forever Young" : item.age;

    return (
        <React.Fragment>
            <div key={item._id} className='row p-3 mt-4 justify-content-between btn_section'>
                <div className="col d-flex justify-content-center align-items-center">
                    <img src={item.img} alt={item.name} className="img_pet" style={{ height: '3cm', border: '#fff solid' ,borderRadius: '50%', padding: '5%'}} />
                </div>
                <div className="col justify-content-start">
                    <h5 className="pt-4 ml-2" style={{color: '#727377'}}> {item.type}</h5>
                    <h2 className="ml-2"> {item.name}</h2>
                    <h5 className="pb-2 ml-2" style={{color: '#727377'}}>age : {age}</h5>
                </div>
                <div className="col-1 align-self-center">
                    <Link to="/petProfile" key={item._id}
                    onClick={() => {localStorage.setItem('dogId', item._id);}}> 
                    <ArrowForwardIosRoundedIcon className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowForwardIosRoundedIcon></Link>
                </div>


            </div>
        </React.Fragment>


        // <div key={item._id} style={{ display: 'flex', position: 'relative', marginTop: '20px', backgroundImage: 'linear-gradient(to right,gray,lightgray)', width: '30%', borderRadius: '10px', borderStyle: 'solid', borderColor: 'lightskyblue', borderWidth: '5px' }}>
        //     <img style={{ display: 'block', position: 'relative', width: '3cm', height: '3cm', borderRadius: '10px', left: '10%', marginTop: '20px' }} alt='cute dog' src={item.img} />
        //     <div style={{ display: 'block', position: 'absolute', flexDirection: 'column', marginTop: '20px', left: '50%' }} >
        //         <text style={{ display: 'flex' }} > name: {item.name}  </text>

        //         <text style={{ display: 'flex' }} > type: {item.type}  </text>

        //         <text style={{ display: 'flex' }} > age: {item.age} </text>
        //     </div>
        //     <NavLink to='/petProfile' onClick={() => {
        //         localStorage.setItem('dogId', item._id);
        //     }} style={{ display: 'block', position: 'absolute',right:'0.5cm', top: '1.5cm', width: '20px', height: '20px' }} ><ChevronRightIcon style={{ color: 'blue' }} /></NavLink>
        // </div>
    )

}


const MyPets = () => {
    const [pets, setPets] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)


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
                setPets(data.data);
                setData(true);
                return;
            })
            .catch((err) => {
                console.log(err.response);
                alert('Sorry Something went wring');
                return;
            })
    }, [])


    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <h1 className="py-4">My Pets</h1>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    {data ? pets.map(showPets) : <Loading />}
                </div>
                <div className="col-auto text-center mt-5">
                    <Link to='/addPet' style={{ borderRadius: '50%' }} className="btn-lg btns_blue my-4"><AddIcon /></Link>
                </div>
            </main>
            <footer> <Navbar namePage={'myPets'} /> </footer>
        </React.Fragment>


        // <Grid style={{backgroundColor:'lightgray'}} >
        //     <h1 style={{ display: 'block', position: 'absolute', width: '10%', top: '1.5cm', left: '15%' }}>My Pets</h1>
        //     <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }} /*className='general-container'*/ >
        //         {
        //             pets.map(showPets)
        //         }
        //         <NavLink to='/addPet' ><Button style={{ backgroundColor: 'blue', color: 'white', marginTop: '1.5cm',marginBottom:'2cm', borderRadius: '50%', height: '55px', fontSize: '20px' }} >+</Button></NavLink>
        //         <Navbar namePage={'myPets'} />
        //     </div>
        // </Grid>

    )
}


export default MyPets


/*<div style={{ display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'lightgray' }}>*/

/*</div>*/