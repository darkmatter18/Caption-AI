import React from 'react';
import {CssBaseline, createMuiTheme, ThemeProvider, Container, Typography} from '@material-ui/core';

import Routes from './routes';
import HeaderComponent from './Components/HeaderComponent';
import {blue, pink} from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {InfoOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom'

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
    const history = useHistory()
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={classes.background}>
                    <HeaderComponent/>
                    <Routes/>
                    <footer className={classes.footer}>
                        <Container maxWidth="sm">
                            <Grid container>
                                <Grid item xl={8} lg={8} sm={8} md={8} xs={8}>
                                    <Typography variant={"body1"}>Caption-AI</Typography>
                                    <Typography variant="body1">
                                        {'Copyright © '}
                                        <Link color="inherit" href="https://www.arkadip.co">
                                            Arkadip
                                        </Link>{' '}
                                        {new Date().getFullYear()}
                                        {'.'}
                                    </Typography>
                                </Grid>
                                <Grid item xl={4} lg={4} sm={4} md={4} xs={4}>
                                    <Typography component={"div"} align={"right"}>
                                        <IconButton onClick={() => {
                                            history.push('/about')
                                        }}>
                                            <InfoOutlined/>
                                        </IconButton>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </footer>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
