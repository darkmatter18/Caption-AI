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
import { useHistory, Redirect, Link as LinkRouter } from 'react-router-dom';
import { makeStyles, Container, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ResultImageComponent from '../ResultImageComponent';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem',
        height: '25rem'
    },
    innerLeftContainer: {
        padding: theme.spacing(2),
        height: '25rem',
        textAlign: "center"
    },
    innerRightContainer: {
        height: '10rem',
        padding: theme.spacing(2),
        textAlign: "center"
    },
    resultTypography: {
        padding: theme.spacing(2),
    }
}))

const ResultComponent = () => {
    const history = useHistory();
    const classes = useStyles();


    if (history.location.state === undefined || history.location.state === null) {
        return (
            <Redirect to="/" />
        )
    }
    else {
        const res = history.location.state.res.res;
        const img = history.location.state.file.file;

        console.log(res);
        return (
            <React.Fragment>
                <Container className={classes.container}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={6}>
                            <Container>
                                <Card className={classes.innerLeftContainer}>
                                    <CardContent>
                                        <ResultImageComponent imageFile={img}/>
                                    </CardContent>
                                </Card>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Container>
                                <Card className={classes.innerRightContainer}>
                                    <CardContent>
                                        <Typography variant="body1" className={classes.resultTypography}>
                                            {res}
                                        </Typography>
                                        <LinkRouter to="/" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" color="primary" startIcon={<ArrowBack />}>
                                                Go Back
                                            </Button>
                                        </LinkRouter>
                                    </CardContent>
                                </Card>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }

}

export default ResultComponent;