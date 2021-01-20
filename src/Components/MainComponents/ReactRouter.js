import * as React from 'react'
import { Route } from 'react-router-dom'
import '../../App.css'
import AddPet from './AddPet'
import MyInfo from './MyInfo'
import Search from './Search'
import Intro from './Intro'

const ReactRouter=()=>{


    return(
        <React.Fragment>
            <Route exact path="/" component={Intro}/>
            <Route exact path="/myInfo" component={MyInfo}/>
            <Route exact path="/myPets" component={MyInfo}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path='/addPet' component={AddPet}/>
        </React.Fragment>
    )
}

export default ReactRouter