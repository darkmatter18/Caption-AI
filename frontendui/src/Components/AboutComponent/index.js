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

import React from "react";
import {Container, Divider, Grid, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4)
    }
}))

const AboutComponent = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Typography variant={"h4"}>
                            Caption AI
                        </Typography>
                        <Typography variant={"subtitle1"}>
                            An AI powered website, that can Caption any Image
                        </Typography>
                        <Divider/>
                        <Typography variant={"body1"}>
                            {"Repository: "}
                            <Link href={"https://github.com/darkmatter18/Caption-AI"}>
                                https://github.com/darkmatter18/Caption-AI
                            </Link>
                        </Typography>
                        <br/>
                        <Typography variant={"h6"}>
                            Technology Used
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant={"body1"}>
                                    <Link href={"https://pytorch.org/"}>
                                        <b>PyTorch:</b>
                                    </Link>{" "}
                                    {"The Heart of the whole AI."}
                                </Typography>
                                <Typography variant={"body2"}>
                                    {"The Deep Learning Model is trained on PyTorch using "}
                                    <Link href={"http://cocodataset.org/"}>
                                        <b>COCO Dataset</b>
                                    </Link>
                                    . <br/>
                                    The trained model is served using PyTorch JIT.
                                </Typography>
                                <br/>
                            </li>
                            <li>
                                <Typography>
                                    <Typography variant={"body1"}>
                                        <Link href={"https://www.starlette.io/"}>
                                            <b>Starlette:</b>
                                        </Link> {" "}
                                        {"ASYNC web framework based on ASGI"}
                                    </Typography>
                                    <Typography variant={"body2"}>
                                        Response Asynchronously the Request.
                                    </Typography>
                                    <Typography variant={"body2"}>
                                        Drives the PyTorch JIT engine to get the response
                                    </Typography>
                                </Typography>
                                <br/>
                            </li>
                            <li>
                                <Typography variant={"body1"}>
                                    <Link href={"https://reactjs.org/"}>
                                        <b>React JS:</b>
                                    </Link>{" "}
                                    {"JavaScript library for the UI"}
                                </Typography>
                                <Typography variant={"body2"}>
                                    Makes the whole Web App so interactive
                                </Typography>
                                <Typography variant={"body2"}>
                                    The Heart of Frontend
                                </Typography>
                                <br/>
                            </li>
                            <li>
                                <Typography variant={"body1"}>
                                    <Link href={"https://cloud.google.com/appengine"}>
                                        <b>Google App Engine:</b>
                                    </Link>{" "}
                                    {"Hosting"}
                                </Typography>
                                <Typography variant={"body2"}>
                                    Hosting the High Memory consuming Deep Learning Model
                                </Typography>
                                <br/>
                            </li>
                            <li>
                                <Typography variant={"body1"}>
                                    {"Other Technologies are: "}
                                    <Link href={"https://gunicorn.org/"}>
                                        <b>Gunicorn</b>
                                    </Link>{", "}
                                    <Link href={"https://github.com/features/actions"}>
                                        <b>Github Actions</b>
                                    </Link>
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Typography variant={"h4"}>
                            Developer
                        </Typography>
                        <Typography variant={"subtitle1"}>
                            The Man behind the Innovation
                        </Typography>
                        <Divider/>
                        <Typography variant={"h5"}>
                            {"Arkadip Bhattacharya ("}
                            <Link href={"https://github.com/darkmatter18"}>
                                @darkmatter18
                            </Link>{")"}
                        </Typography><br/>
                        <Typography variant={"body1"}>
                            {"Personal Portfolio: "}
                            <Link href={"https://www.arkadip.co"}>
                                https://www.arkadip.co
                            </Link>
                        </Typography><br/>
                        <Typography variant={"body1"}>
                            {"LinkedIn: "}
                            <Link href={"https://linkedin.com/in/arkadip"}>
                                https://linkedin.com/in/arkadip
                            </Link>
                        </Typography><br/>
                        <Typography variant={"body1"}>
                            {"Github: "}
                            <Link href={"https://github.com/darkmatter18"}>
                                https://github.com/darkmatter18
                            </Link>
                        </Typography><br/>
                        <Divider/><br/>
                        <Typography variant={"h6"}>
                            WE DO NOT STORE ANY DATA
                        </Typography>
                        <br/>
                        <Typography variant={"h4"}>
                            Thank you
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default AboutComponent