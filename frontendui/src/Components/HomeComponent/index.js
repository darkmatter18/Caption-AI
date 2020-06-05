import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, makeStyles, Grid, Card, CardContent, Button } from '@material-ui/core';
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
    const classes = useStyles();
    const history = useHistory();
    const [file, setfile] = useState(null);
    const [progress, setprogress] = useState(null);

    const uploadApi = async (data) => {
        if (file === null) {
            alert("Select a file before Submitting");
        }
        else {
            try {
                const res = await axios.post('/api/analyze', data, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setprogress(percentCompleted);
                    }
                });
                history.push('/result', { res: res.data });
            } catch (e) {
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
                                    <Button variant="contained" color="primary" onClick={upload}>Make Caption</Button>
                                    <span>{progress !== null ? `Uploading: ${progress}%` : <React.Fragment />}</span>
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