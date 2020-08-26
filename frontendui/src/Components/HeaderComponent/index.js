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
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.main,
        textShadow: `0px 0px 10px ${theme.palette.primary.light}`
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        fontFamily: "'DM Mono', monospace;"
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));

const HeaderComponent = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h3" color="inherit" className={classes.toolbarTitle} align="center">
                        Caption - AI
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default HeaderComponent;