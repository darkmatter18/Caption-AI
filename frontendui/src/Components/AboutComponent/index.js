import React from "react";
import {Container, Typography} from "@material-ui/core";
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
                <Typography variant={"h4"}>
                    Caption AI
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default AboutComponent