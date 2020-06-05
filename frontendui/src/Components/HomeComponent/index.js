import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, makeStyles, Grid, Card, CardContent, Button, Box, CircularProgress, Typography } from '@material-ui/core';
import ImageUploaderComponent from '../ImageUploaderComponent';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem',
        height: '25rem'
    },
    innerLeftContainer: {
        padding: theme.spacing(2),
        height: '25rem'
    },
    innerRightContainer: {
        padding: theme.spacing(2),
        textAlign: "center"
    }
}))

const HomeComponent = () => {
    const NETWORK_STATE = {
        AVAILABLE: 0,
        UPLOADING: 1,
        ANALYSING: 2
    };

    const classes = useStyles();
    const history = useHistory();
    const [file, setfile] = useState(null);
    const [networkState, setnetworkState] = useState(NETWORK_STATE.AVAILABLE);
    const [progress, setprogress] = useState(0);

    const uploadApi = async (data) => {
        if (file === null) {
            alert("Select a file before Submitting");
        }
        else {
            try {
                setnetworkState(NETWORK_STATE.UPLOADING);
                const res = await axios.post('/api/analyze', data, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (percentCompleted === 100) {
                            setnetworkState(NETWORK_STATE.ANALYSING);
                        }
                        setprogress(percentCompleted);
                    },
                });
                setnetworkState(NETWORK_STATE.AVAILABLE);
                history.push('/result', { res: res.data });
            } catch (e) {
                console.log("Error on Network!!");
                setnetworkState(NETWORK_STATE.AVAILABLE);
                console.log(e);
            }
        }
    }

    const upload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        uploadApi(formData);
    }

    const onChange = file => {
        console.log(file);
        setfile(file);
    };

    const renderSubmitButton = () => {
        if (networkState === NETWORK_STATE.AVAILABLE) {
            return <Button variant="contained" color="primary" onClick={upload}>Make Caption</Button>
        }
        else if (networkState === NETWORK_STATE.UPLOADING) {
            return (
                <Button variant="contained" color="primary">
                    <Box position="relative" display="inline-flex">
                        <CircularProgress variant="static" value={progress}/>
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="caption" component="div" color="textSecondary">
                                {`${progress}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Button>
            )
        }
        else if (networkState === NETWORK_STATE.ANALYSING){
            return <Button variant="contained" color="primary" >ANALYSING...</Button>
        }
    }
    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={12} md={6}>
                        <Container>
                            <Card className={classes.innerLeftContainer}>
                                <CardContent>
                                    <form>
                                        <ImageUploaderComponent onChange={onChange} />
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Container>
                            <Card className={classes.innerRightContainer}>
                                <CardContent>
                                    {renderSubmitButton()}
                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default HomeComponent;