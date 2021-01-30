import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';
import { Button, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link, NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive'
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const MyPets = (props) => {
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

                //if deleted in profile page then set state here.
                if (props.location.state != null) {
                    if (props.location.state.petDeleted) {
                        console.log(props.location.state.petDeleted);
                        deleted(props.location.state.petDeleted);
                    }
                }

                //if added pet then set state here.
                if (props.location.state != null) {
                    if (props.location.state.petAdded) {
                        console.log(props.location.state.petAdded);
                        added(props.location.state.petAdded);
                    }
                }
                return;
            })
            .catch((err) => {
                console.log(err.response);
                alert('Sorry Something went wring');
                return;
            })
    }, [])


    const added = (item) => {
        setPets(prevState => {
            [...pets].push({
                _id: item._id,
                name: item.name,
                type: item.type,
                age: item.age,
                weight: item.weight,
                gender: item.gender,
                activityLevel: item.activityLevel,
                foodLevel: item.foodLevel,
                dayPlanLevel: item.dayPlanLevel,
                dayPlan: item.dayPlan,
                hobbies: item.hobbies
            });
        })
    }

    const deleted = (deleteId) => {
        setPets(prevState => prevState.filter(({ _id }) => _id !== deleteId));
        //after deleted in page set the props to starting --null
        props.location.state = null;
    }


    const showPets = (item) => {
        let age = (item.age === undefined) ? "Forever Young" : item.age;
        return (
            <React.Fragment>
                <div key={item._id} className='row p-3 mt-4 justify-content-between btn_section'>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img src={item.img} alt={item.name} className="img_pet" style={{ height: '3cm', border: '#fff solid', borderRadius: '50%', padding: '5%' }} />
                    </div>
                    <div className="col justify-content-start">
                        <h5 className="pt-4 ml-2" style={{ color: '#727377' }}> {item.type}</h5>
                        <h2 className="ml-2"> {item.name}</h2>
                        <h5 className="pb-2 ml-2" style={{ color: '#727377' }}>age : {age}</h5>
                    </div>
                    <div className="col-1 align-self-center">
                        <Link to={{ pathname: "/petProfile", state: { pet_id: item._id } }} >
                            <ArrowForwardIosRoundedIcon className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowForwardIosRoundedIcon></Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    console.log(props.location.state);
    if (props.location.state != null) {
        console.log(props.location.state.petEdited);
        console.log(props.location.state.petDeleted);
    }
    console.log(pets);

    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link to={{ pathname: "/myInfo"}} className="py-2" ><ArrowBackIcon style={{ fontSize: 'xx-large', color: 'black' }}></ArrowBackIcon></Link>
                        <h1 className="py-2">My Pets</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    {data ? pets.map(showPets) : <Loading />}
                </div>
                <div className="col-auto text-center mt-5" style={{ marginBottom: '10%' }}>
                    <Link to={{ pathname: '/addPet' }} style={{ borderRadius: '50%' }} className="btn-lg btns_blue my-4"><AddIcon /></Link>
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