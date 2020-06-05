import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, makeStyles, Grid, Card, CardContent, Button, LinearProgress, Typography } from '@material-ui/core';
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
        height: '10rem',
        padding: theme.spacing(2),
        textAlign: "center"
    },
    uploadingButtonInner: {
        color: theme.palette.background.paper
    }
}))

const HomeComponent = () => {
    const NETWORK_STATE = {
        AVAILABLE: 0,
        UPLOADING: 1,
        ANALYSING: 2
    };
    const source = axios.CancelToken.source();

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
                    cancelToken: source.token
                });
                history.push('/result', { res: res.data, file: { file } });
            } catch (e) {
                console.log("Error on Network!!");
                console.log(e);
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                }
                setnetworkState(NETWORK_STATE.AVAILABLE);
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
        setfile(file);
    };

    const renderProgress = () => {
        if (networkState === NETWORK_STATE.UPLOADING) {
            return (
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="caption">
                            Uploading...  {`${progress}%`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <LinearProgress variant="determinate" value={progress} />
                    </Grid>
                </Grid>
            )
        }
        if (networkState === NETWORK_STATE.ANALYSING) {
            return (
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="caption">
                            Analyzing...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <LinearProgress />
                    </Grid>
                </Grid>
            )
        }
    }

    const renderSubmitButton = () => {
        if (networkState === NETWORK_STATE.AVAILABLE) {
            return <Button variant="contained" size="large" color="primary" onClick={upload}>Make Caption</Button>
        }
        else if (networkState === NETWORK_STATE.UPLOADING) {
            return (
                <Button variant="contained" color="secondary" size="large" onClick={() => { source.cancel("Operation cancelled by User") }}>
                    Cancel
                </Button>
            )
        }
        else if (networkState === NETWORK_STATE.ANALYSING) {
            return <Button variant="contained" color="secondary" size="large" onClick={() => { source.cancel("Operation cancelled by User") }}>Cancel</Button>
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
                                {renderProgress()}
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default HomeComponent;