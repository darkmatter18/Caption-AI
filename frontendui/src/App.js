import React from 'react';
import {CssBaseline, createMuiTheme, ThemeProvider, Container, Typography} from '@material-ui/core';

import Routes from './routes';
import HeaderComponent from './Components/HeaderComponent';
import {blue, pink} from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue.A400,
        },
        secondary: {
            main: pink[500],
        }
    }
})

const useStyles = makeStyles((theme) => ({
    background: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${process.env.PUBLIC_URL}/SubtlePrism.svg)`,
        [theme.breakpoints.down('sm')]: {
            minHeight: '120vh',
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: '100vh',
        },
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
                            <Typography variant={"body1"}>Caption-AI</Typography>
                            <Typography variant="body1">
                                {'Copyright © '}
                                <Link color="inherit" href="https://www.arkadip.co">
                                Arkadip
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Container>
                    </footer>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
