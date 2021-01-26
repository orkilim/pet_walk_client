import * as React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';

const MyInfo = () => {
    const [myPets, setMyPets] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [petIndex, setPetIndex] = React.useState(0); // index from myPets array 

    React.useEffect(() => {
        console.log(data);
        //ok user then do server call:
        axios({
            method: 'GET',
            url: 'https://petwalkapp.herokuapp.com/pets/ofUser',
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then((data) => {
                console.log(data);
                setMyPets(data);
                setData(true);
                return;
                // showMyPets();
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })

    }, [])

    //Click and render the pet in the array :
    const handleClick = () => {
        if (petIndex <= myPets.length && petIndex != 0) {
            console.log(myPets);
            setPetIndex(petIndex - 1);
            showMyPets();
        }
        if (petIndex == 0) {
            setPetIndex(petIndex + 1);
            showMyPets();
        }
    }

    const showMyPets = () => {
        if (myPets.length == 0) {
            return ('no Pats');
        }
        // let defultData = {
        //     img: (myPets[petIndex].img == undefined) ? "https://icon-library.com/images/dog-icon/dog-icon-16.jpg" : myPets[petIndex].img,
        //     age: (!myPets[petIndex].age) ? "Forever Young" : myPets[petIndex].age,
        //     currDayPlanLevel = (myPets[petIndex].currDayPlanLevel == undefined) ? 0 : myPets[petIndex].currDayPlanLevel,
        //     currActivityLevel = (myPets[petIndex].currActivityLevel == undefined) ? 0 : myPets[petIndex].currActivityLevel,
        //     currFoodLevel = (myPets[petIndex].currFoodLevel == undefined) ? 0 : myPets[petIndex].currFoodLevel
        // }
        // myPets[petIndex].complitDayPlan = myPets[petIndex].currDayPlanLevel == 0 ? myPets[petIndex].currDayPlanLevel : Math.ceil(myPets[petIndex].currDayPlanLevel / (100 / myPets[petIndex].dayPlanLevel));
        // myPets[petIndex].complitActivity = myPets[petIndex].currActivityLevel == 0 ? myPets[petIndex].currActivityLevel : Math.ceil(myPets[petIndex].currActivityLevel / (100 / myPets[petIndex].activityLevel));
        // myPets[petIndex].complitFood = myPets[petIndex].currFoodLevel == 0 ? myPets[petIndex].currFoodLevel : Math.ceil(myPets[petIndex].currFoodLevel / (100 / myPets[petIndex].foodLevel));

        console.log(myPets.data);
        console.log(petIndex);
        console.log(myPets.data[petIndex].img);
        return (
            <React.Fragment>
                <div className="row p-3 justify-content-between btn_section" >
                    <ArrowBackIosRoundedIcon onClick={handleClick} className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowBackIosRoundedIcon>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img src={myPets.data[petIndex].img}
                            alt="Avatar" className="img_pet" style={{ width: '50%', border: '#fff solid', borderRadius: '50%', padding: '5%' }} />
                        <div className="col-6 justify-content-end">
                            <h5 className="pt-4 pl-2" style={{ color: '#727377' }}> {myPets.data[petIndex].type}</h5>
                            <h2 className="pl-2">{myPets.data[petIndex].name}</h2>
                            <h5 className="pb-2 pl-2" style={{ color: '#727377' }}> age {myPets.data[petIndex].age}</h5>
                        </div>
                        <ArrowForwardIosRoundedIcon onClick={handleClick} className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowForwardIosRoundedIcon>

                    </div>
                </div>


            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <h1 className="py-4">Home</h1>
                    <h3>Dashboard</h3>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    {data ? showMyPets() : <Loading />}
                </div>
            </main>
            <footer> <Navbar namePage={'myInfo'} /> </footer>
        </React.Fragment>
    );

}

export default MyInfo
