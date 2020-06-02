import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import ResultComponent from './Components/ResultComponent';

function Routes() {
    return(
        <React.Fragment>
            <Router>
                <Route path="/" component={HomeComponent} exact/>
                <Route path="/result" component={ResultComponent} exact/>
            </Router>
        </React.Fragment>
    )
}

export default Routes;