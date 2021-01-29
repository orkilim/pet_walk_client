import * as React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
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
    //elements thet can be updete in this page :
    const [activity, setActiviry] = React.useState(0);
    const [plan, setPlan] = React.useState(0);
    const [food, setFood] = React.useState(0);

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
                console.log(data.data);
                setMyPets(data.data);
                setActiviry(data.data[petIndex].currActivityLevel);
                setPlan(data.data[petIndex].currDayPlanLevel);
                setFood(data.data[petIndex].currFoodLevel);
                setData(true);
                return;
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })

    }, [])

    //Click and render the pet in the array :
    const handleClick = () => {
        if (petIndex == 0) {
            setPetIndex(myPets.length - 1);
            setActiviry(myPets[myPets.length - 1].currDayPlanLevel);
            setPlan(myPets[myPets.length - 1].currDayPlanLevel);
            setFood(myPets[myPets.length - 1].currFoodLevel);
        }
        if (petIndex > 0) {
            setPetIndex(petIndex - 1);
            setActiviry(myPets[petIndex - 1].currDayPlanLevel);
            setPlan(myPets[petIndex - 1].currDayPlanLevel);
            setFood(myPets[petIndex - 1].currFoodLevel);
        }
    }

    const handleClickRight = () => {
        if (petIndex == myPets.length - 1) {
            setPetIndex(0);
            setActiviry(myPets[myPets.length - 1].currDayPlanLevel);
            setPlan(myPets[myPets.length - 1].currDayPlanLevel);
            setFood(myPets[myPets.length - 1].currFoodLevel);
        }
        if (petIndex >= 0 && petIndex < myPets.length - 1) {
            setPetIndex(petIndex + 1);
            setActiviry(myPets[petIndex + 1].currDayPlanLevel);
            setPlan(myPets[petIndex + 1].currDayPlanLevel);
            setFood(myPets[petIndex + 1].currFoodLevel);
        }
    }

    const upadteActivity = async (level) => {
        //update in db :
        let dataBodyVal = {
            id: myPets[petIndex]._id, //requird for edting in server 
            name: myPets[petIndex].name,
            type: myPets[petIndex].type,
            dayPlan: myPets[petIndex].dayPlan,
            dayPlanLevel: myPets[petIndex].dayPlanLevel,
            activityLevel: myPets[petIndex].activityLevel,
            foodLevel: myPets[petIndex].foodLevel,
            currActivityLevel: Number(level)
        }
        console.log(dataBodyVal);

        //update
        await axios({
            method: 'PUT',
            url: "https://petwalkapp.herokuapp.com/pets",
            data: dataBodyVal,
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then(myData => {
                console.log(dataBodyVal);
                setActiviry(dataBodyVal.currActivityLevel);

                console.log("up", activity);

                // let perv = myPets.map(data => data._id !== dataBodyVal.id ? data : { ...data, currActivityLevel: Number(level) });
                // console.log("up", myPets);
                // try{
                //     setMyPets(myPets=> myPets.map(data => data._id !== dataBodyVal.id ? data : { ...data, currActivityLevel: Number(level) }));
                //     console.log("uprty", myPets);
                // }catch(e){
                //     console.log(e);
                // }
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

    const onClickPlay = async () => {
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
            if (Number(result.value[1]) > 100 || Number(result.value[1]) < 0) {
                Swal.fire({
                    title: 'Energy level Must be Number Between 1-100',
                    confirmButtonText: 'Try Agin'
                })
                return;
            }
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
            console.log(result.value[1]);
            upadteActivity(result.value[1]);
            if (Number(result.value[1]) == 100) {
                //say Goog Jub:
                Swal.fire({
                    title: 'Goog Jub',
                    width: 600,
                    padding: '3em',
                    background: '#fff url(/images/good-job.jpg) ',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/good.gif")                    `
                })
            }
        })
    }

    const planClick = () =>{
        Swal.fire({
            title: `${myPets[petIndex].name} Plan day level `,
            icon: 'question',
            input: 'range',
            inputLabel: 'Your Choice',
            inputAttributes: {
              min: 1,
              max: 100,
              step: 1
            },
            inputValue: plan
          })
          //console.log(inputValue);
          //setPlan(inputValue);
    }

    const showMyPets = () => {
        console.log(myPets)
        if (myPets.length == 0) {
            return ('no Pats');
        }
        //set defult elements from db
        let age = (myPets[petIndex].age == undefined) ? "Forever Young" : myPets[petIndex].age;
 
        myPets[petIndex].complitDayPlan = myPets[petIndex].currDayPlanLevel == 0 ? myPets[petIndex].currDayPlanLevel : Math.ceil(myPets[petIndex].currDayPlanLevel / (100 / myPets[petIndex].dayPlanLevel));
        myPets[petIndex].complitActivity = myPets[petIndex].currActivityLevel == 0 ? myPets[petIndex].currActivityLevel : Math.ceil(myPets[petIndex].currActivityLevel / (100 / myPets[petIndex].activityLevel));
        myPets[petIndex].complitFood = myPets[petIndex].currFoodLevel == 0 ? myPets[petIndex].currFoodLevel : Math.ceil(myPets[petIndex].currFoodLevel / (100 / myPets[petIndex].foodLevel));

        console.log(myPets[petIndex].complitDayPlan);
        console.log(myPets[petIndex].complitActivity);
        console.log(myPets[petIndex].complitFood);
   
        return (
            <React.Fragment>
                <div className="row p-3 justify-content-between btn_section" >
                    <ArrowBackIosRoundedIcon onClick={handleClick} className="align-self-center" style={{ fontSize: '200%', color: '#6EA8FF' }}></ArrowBackIosRoundedIcon>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img src={myPets[petIndex].img}
                            alt="Avatar" className="img_pet" style={{ width: '50%', border: '#fff solid', borderRadius: '50%', padding: '5%' }} />
                        <div className="col-6 justify-content-end">
                            <h5 className="pt-4 pl-2" style={{ color: '#727377' }}> {myPets[petIndex].type}</h5>
                            <h2 className="pl-2">{myPets[petIndex].name}</h2>
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
                        <h5>{myPets[petIndex].complitDayPlan} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        <Chart mydata={plan} onClick={planClick}/>
                    </div>
                </div>
                {/*End of dayly plan section */}

                {/* Energy avaliable section */}
                <div className='row p-3 justify-content-between btn_section mb-3' style={{ boxShadow: 'none' }}>
                    <div className="col-8 align-self-center p-2">
                        <h4><strong>Energy avaliable</strong></h4>
                        <h5>{myPets[petIndex].complitActivity} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        <Chart mydata={activity} />
                    </div>
                </div>
                {/*End of Energy avaliable section */}

                {/* EDaily food habits section */}
                <div className='row p-3 justify-content-between btn_section mb-3' style={{ boxShadow: 'none' }}>
                    <div className="col-8 align-self-center p-2">
                        <h4><strong>Daily food habits</strong></h4>
                        <h5>{myPets[petIndex].complitFood} tasks completed</h5>
                    </div>
                    <div className='col-4 align-self-center text-center'>
                        <Chart mydata={food} />
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
        <>
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
        </>
    );

}

export default MyInfo
