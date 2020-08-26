/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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