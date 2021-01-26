import * as React from 'react';
import axios from 'axios';
//import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
//import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';

const MyInfo = () => {
    const [myPets, setMyPets] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [petIndex, setPetIndex] = React.useState(0); // index from data array 

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
        //else dose nothing 
    }

    const showMyPets = () => {
        if (myPets.length == 0) {
            return ('no Pats');
        }
        // let defultData = {
        //     img: (data[petIndex].img == undefined) ? "https://icon-library.com/images/dog-icon/dog-icon-16.jpg" : data[petIndex].img,
        //     age: (!data[petIndex].age) ? "Forever Young" : data[petIndex].age,
        //     currDayPlanLevel = (data[petIndex].currDayPlanLevel == undefined) ? 0 : data[petIndex].currDayPlanLevel,
        //     currActivityLevel = (data[petIndex].currActivityLevel == undefined) ? 0 : data[petIndex].currActivityLevel,
        //     currFoodLevel = (data[petIndex].currFoodLevel == undefined) ? 0 : data[petIndex].currFoodLevel
        // }
        // data[petIndex].complitDayPlan = data[petIndex].currDayPlanLevel == 0 ? data[petIndex].currDayPlanLevel : Math.ceil(data[petIndex].currDayPlanLevel / (100 / data[petIndex].dayPlanLevel));
        // data[petIndex].complitActivity = data[petIndex].currActivityLevel == 0 ? data[petIndex].currActivityLevel : Math.ceil(data[petIndex].currActivityLevel / (100 / data[petIndex].activityLevel));
        // data[petIndex].complitFood = data[petIndex].currFoodLevel == 0 ? data[petIndex].currFoodLevel : Math.ceil(data[petIndex].currFoodLevel / (100 / data[petIndex].foodLevel));

        // return ( //fix class &style
        //     <React.Fragment>
        //         <div className='row p-3 justify-content-between btn_section'>
        //             <div className="col-1 align-self-center" onClick={onClickLeft()}>
        //                 <i className="fa fa-chevron-left" style={{ fontSize: '200%', color: '#6EA8FF', cursor: 'pointer' }} aria-hidden="true"></i>
        //             </div>
        //         </div>
        //     </React.Fragment>
        //)
        return (
            <React.Fragment>
                <div className="row p-3 justify-content-between btn_section" >
                    <ArrowBackIosRoundedIcon color='#6EA8FF' onClick={handleClick} className="col-1 align-self-center"></ArrowBackIosRoundedIcon>

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
