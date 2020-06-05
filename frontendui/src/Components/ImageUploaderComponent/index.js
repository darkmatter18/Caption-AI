import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';

import UploadIcon from './uploadIcon.svg';
import { useStyles } from './style';


const ImageUploaderComponent = () => {
    const ACCEPT = 'image/*';
    const IMGEXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png'];
    const MAXFILESOZE = 5242880;
    const ERROR = {
        NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
        FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
    };
    const classes = useStyles();

    const [fileError, setfileError] = useState(null);
    const [inputElement, setinputElement] = useState(null);
    const [dataURL, setdataURL] = useState(null);
    const [file, setfile] = useState(null);

    const hasExtension = (fileName) => {
        const pattern = '(' + IMGEXTENSIONS.join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
    }

    const renderErrors = () => {
        if (fileError) {
            return (
                `* ${fileError.name} ${fileError.type === ERROR.FILESIZE_TOO_LARGE ? "file size is too big" : "is not a supported file extension"}`
            );
        }
    }

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                resolve({ file, dataURL });
            };

            reader.readAsDataURL(file);
        });
    }

    const triggerFileUpload = () => {
        inputElement.click();
    }

    const onDropFile = (e) => {
        const file = e.target.files[0];

        let fileError = {
            name: file.name,
        };

        // Check for file extension
        if (!hasExtension(file.name)) {
            fileError = Object.assign(fileError, {
                type: ERROR.NOT_SUPPORTED_EXTENSION
            });
            setfileError(fileError);
            return;
        }

        // Check for file size
        if (file.size > MAXFILESOZE) {
            fileError = Object.assign(fileError, {
                type: ERROR.FILESIZE_TOO_LARGE
            });
            setfileError(fileError);
            return;
        }

        readFile(file).then((FileData) => {
            setdataURL(FileData.dataURL);
            setfile(FileData.file);
        });
    }

    const renderPreview = () => {
        if (file) {
            return (
                <div className={classes.uploadPicturesWrapper}>
                    <div className={classes.uploadPictureContainer}>
                        <div className={classes.deleteImage} onClick={() => removeImage()}>X</div>
                        <img src={dataURL} style={{ width: '100%' }} alt="preview" />
                    </div>
                </div>
            )
        }
    }

    const removeImage = () => {
        setfile(null);
        setdataURL(null);
    }

    return (
        <React.Fragment>
            <div>
                <div className={classes.fileContainer}>
                    <img src={UploadIcon} className="uploadIcon" alt="Upload Icon" />
                    <Typography variant="body2">Max file size: 5mb</Typography>
                    <div className={classes.errorsContainer}>
                        {renderErrors()}
                    </div>
                    <Button variant="outlined" color="primary" onClick={triggerFileUpload}>
                        Choose image
                    </Button>
                    <input
                        hidden={true}
                        type="file"
                        ref={input => setinputElement(input)}
                        onChange={onDropFile}
                        accept={ACCEPT}
                    />
                    {renderPreview()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageUploaderComponent;