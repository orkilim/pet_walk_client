import * as React from 'react'
import { Route } from 'react-router-dom'
import '../../App.css'
import AddPet from './AddPet'
import MyInfo from './MyInfo'
import Search from './Search'
import Intro from './Intro'
import EditPet from './EditPet'
import MyPets from './MyPets'
import Login from './Login'
import PetProfile from './PetProfile'
import Community from './Community'
import MyCommunity from './MyCommunity'




const ReactRouter=()=>{
    return(
        <React.Fragment>
            <Route exact path="/" component={Intro}/>
            <Route exact path="/myInfo" component={MyInfo}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path='/addPet' component={AddPet}/>
            <Route exact path='/editPet' component={EditPet}/>
            <Route exact path='/myPets' component={MyPets}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/petProfile' component={PetProfile}/>
            <Route exact path='/community' component={Community}/>
            <Route exact path='/myCommunity' component={MyCommunity}/>
        </React.Fragment>
    )
}

export default ReactRouter