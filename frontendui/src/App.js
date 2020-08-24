import React from 'react';
import {CssBaseline, createMuiTheme, ThemeProvider, Container, Typography} from '@material-ui/core';

import Routes from './routes';
import HeaderComponent from './Components/HeaderComponent';
import {blue, pink} from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue.A400,
            light: blue.A100,
            dark: blue.A700
        },
        secondary: {
            main: pink[500],
            light: pink[300],
            dark: pink[800]
        }
    }
})

const useStyles = makeStyles((theme) => ({
    background: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/SubtlePrism.svg)`
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    }
}))

const App = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={classes.background}>
                    <HeaderComponent/>
                    <Routes/>
                    <footer className={classes.footer}>
                        <Container maxWidth="sm">
                            <Typography variant="body1">My sticky footer can be found here.</Typography>
                        </Container>
                    </footer>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
