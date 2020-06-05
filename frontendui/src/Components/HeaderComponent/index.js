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