import React from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';

const ResultComponent = () => {
    const history = useHistory();
    if (history.location.state == undefined || history.location.state == null) {
        return (
            <Redirect to="/" />
        )
    }
    else {
        const res = history.location.state.res.res;
        console.log(res);
        return (
            <div>
                <span>{res}</span>
                <div>
                    <Link to="/">Go Back</Link>
                </div>
            </div>
        )
    }

}

export default ResultComponent;