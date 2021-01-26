import * as React from 'react';
import axios from 'axios';
//import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
//import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';
import { Pie } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import Chart from './Chart';



const MyInfo = () => {
    const [myPets, setMyPets] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [petIndex, setPetIndex] = React.useState(0); // index from myPets array 
    const [chart1, setChart1] = React.useState({});

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
        if (petIndex == 0) {
            setPetIndex(myPets.data.length - 1);
        }
        if (petIndex > 0) {
            setPetIndex(petIndex - 1);
        }
    }

    const handleClickRight = () => {
        if (petIndex == myPets.data.length - 1) {
            setPetIndex(0);
        }
        if (petIndex >= 0 && petIndex < myPets.data.length - 1) {
            setPetIndex(petIndex + 1);
        }
    }

    const upadteActivity = (level) => {
        //update in db :
        let dataBodyVal = {
            id: myPets.data[petIndex]._id, //requird for edting in server 
            name: myPets.data[petIndex].name,
            type: myPets.data[petIndex].type,
            dayPlan: myPets.data[petIndex].dayPlan,
            dayPlanLevel: myPets.data[petIndex].dayPlanLevel,
            activityLevel: myPets.data[petIndex].activityLevel,
            foodLevel: myPets.data[petIndex].foodLevel,
            currActivityLevel: Number(level)
        }
        console.log(dataBodyVal);

        //update
        axios({
            method: 'PUT',
            url: "https://petwalkapp.herokuapp.com/pets",
            data: dataBodyVal,
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then(myData => {
                console.log(myData);
                //myPets.data[petIndex].currActivityLevel=Number(level);
                console.log(myPets.data[petIndex].currActivityLevel);
                console.log(level);
                let perv = myPets.data.map(data => data._id !== dataBodyVal.id ? data : { ...data, currActivityLevel: Number(level) });
                console.log("up", perv);

                //setMyPets(myPets = myPets.data.map(item => item._id !== dataBodyVal.id ? item : { ...item, currActivityLevel: Number(level) }));
                //console.log("up", myPets);
                return;

            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status == 404) {
                    alert(error.response);
                }
                if (error.response.status == 500) {
                    alert("Server Error , Try later");
                }
                return;
            })
    }


    const onClickPlay = () => {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Where we play?',
                text: 'Garden, park, house, with friends'
            },
            'Playing time',
            'Energy level'
        ]).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value)
                Swal.fire({
                    title: 'All done!',
                    html: `
                Your Day Play:
                <pre><code>${answers}</code></pre>
              `,
                    confirmButtonText: 'Lovely!'
                })
            }
            //update activity level:
            console.log(result.value[2]);
            upadteActivity(result.value[2]);
            if (Number(result.value[2]) >= 1) {
                console.log("d");
                // updatMyInfo(result.value[2]);
            }
        })
    }

    // const ChartData = () => {
    //     let charData= {
    //         datasets: [{
    //             data:[myPets.data[petIndex].age,20-myPets.data[petIndex].age],
    //             backgroundColor: ['rgb(110, 168, 255)','rgb(255, 255, 255)']
    //         }]
    //     }
    //     setChart1(charData);
    //     return(
    //         <Pie
    //         //data= {chart1}
    //     />
    //     )
    // }


    const showMyPets = () => {
        if (myPets.length == 0) {
            return ('no Pats');
        }
        //set defult elements from db
        let age = (myPets.data[petIndex].age == undefined) ? "Forever Young" : myPets.data[petIndex].age;
        myPets.data[petIndex].currDayPlanLevel = (myPets.data[petIndex].currDayPlanLevel == undefined) ? 0 : myPets.data[petIndex].currDayPlanLevel;
        myPets.data[petIndex].currActivityLevel = (myPets.data[petIndex].currActivityLevel == undefined) ? 0 : myPets.data[petIndex].currActivityLevel;
        myPets.data[petIndex].currFoodLevel = (myPets.data[petIndex].currFoodLevel == undefined) ? 0 : myPets.data[petIndex].currFoodLevel;

        myPets.data[petIndex].complitDayPlan = myPets.data[petIndex].currDayPlanLevel == 0 ? myPets.data[petIndex].currDayPlanLevel : Math.ceil(myPets.data[petIndex].currDayPlanLevel / (100 / myPets.data[petIndex].dayPlanLevel));
        myPets.data[petIndex].complitActivity = myPets.data[petIndex].currActivityLevel == 0 ? myPets.data[petIndex].currActivityLevel : Math.ceil(myPets.data[petIndex].currActivityLevel / (100 / myPets.data[petIndex].activityLevel));
        myPets.data[petIndex].complitFood = myPets.data[petIndex].currFoodLevel == 0 ? myPets.data[petIndex].currFoodLevel : Math.ceil(myPets.data[petIndex].currFoodLevel / (100 / myPets.data[petIndex].foodLevel));

        console.log(myPets.data[petIndex].complitDayPlan);
        console.log(myPets.data[petIndex].complitActivity);
        console.log(myPets.data[petIndex].complitFood);
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
                            <h5 className="pb-2 pl-2" style={{ color: '#727377' }}> age {age}</h5>
                        </div>
                        <ArrowForwardIosRoundedIcon onClick={handleClickRight} className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowForwardIosRoundedIcon>
                    </div>
                </div>
                <h3 className="mt-4 pb-2">State</h3>
                {/* dayly plan section */}
                <div className='row p-3 justify-content-between btn_section mb-3' style={{ boxShadow: 'none' }}>
                    <div className="col-8 align-self-center p-2">
                        <h4><strong>Today's Plans</strong></h4>
                        <h5>{myPets.data[petIndex].complitDayPlan} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        {/* {ChartData()} */}
                        <Chart mydata={myPets.data[petIndex].currDayPlanLevel} />
                    </div>
                </div>
                {/*End of dayly plan section */}

                {/* Energy avaliable section */}
                <div className='row p-3 justify-content-between btn_section mb-3' style={{ boxShadow: 'none' }}>
                    <div className="col-8 align-self-center p-2">
                        <h4><strong>Energy avaliable</strong></h4>
                        <h5>{myPets.data[petIndex].complitActivity} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        {/* {ChartData()} */}
                        <Chart mydata={myPets.data[petIndex].currActivityLevel} />
                    </div>
                </div>
                {/*End of Energy avaliable section */}

                {/* EDaily food habits section */}
                <div className='row p-3 justify-content-between btn_section mb-3' style={{ boxShadow: 'none' }}>
                    <div className="col-8 align-self-center p-2">
                        <h4><strong>Daily food habits</strong></h4>
                        <h5>{myPets.data[petIndex].complitFood} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        {/* {ChartData()} */}
                        <Chart mydata={myPets.data[petIndex].currFoodLevel} />
                    </div>
                </div>
                {/*End of Daily food habits section */}

                <div className='col-auto text-center' style={{ marginBottom: '100px' }}>
                    <button onClick={onClickPlay} className="btnStyle btn-lg btns_blue mt-4 w-75">Start a Play</button>
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
