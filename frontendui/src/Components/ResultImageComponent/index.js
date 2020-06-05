import React from 'react';

class ResultImageComponent extends React.Component {
    state = { dataURL: null };

    readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                resolve({ dataURL });
            };

            reader.readAsDataURL(file);
        });
    }

    componentDidMount = () => {
        this.readFile(this.props.imageFile).then((data) => {
            this.setState({ dataURL: data.dataURL });
        })
    }

    render() {
        if (this.state.dataURL !== null) {
            return (
                <React.Fragment>
                    <img src={this.state.dataURL} style={{ height: '20rem' }} alt="preview" />
                </React.Fragment>
            )
        }
        else {
            return <React.Fragment />
        }
    }
}

export default ResultImageComponent;