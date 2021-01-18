import * as React from 'react'
import { Route } from 'react-router-dom'
import '../../App.css'
import MyInfo from './MyInfo'
import Search from './Search'

const ReactRouter=()=>{


    return(
        <React.Fragment>
            <Route exact path="/myInfo" component={MyInfo}/>
            <Route exact path="/myPets" component={MyInfo}/>
            <Route exact path="/search" component={Search}/>
        </React.Fragment>
    )
}

export default ReactRouter