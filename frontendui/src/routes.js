import React from 'react';
import { Route } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import ResultComponent from './Components/ResultComponent';
import AboutComponent from "./Components/AboutComponent";

function Routes() {
    return(
        <React.Fragment>
            <Route path="/" component={HomeComponent} exact/>
            <Route path="/result" component={ResultComponent} exact/>
            <Route path={"/about"} component={AboutComponent} exact/>
        </React.Fragment>
    )
}

export default Routes;