import * as React from 'react'
import { Route } from 'react-router-dom'
import '../../App.css'
import myInfo from './myInfo'

const ReactRouter=()=>{


    return(
        <React.Fragment>
            <Route exact path="/myInfo" component={myInfo}/>
            <Route exact path="/myPets" component={myInfo}/>
        </React.Fragment>
    )
}

export default ReactRouter