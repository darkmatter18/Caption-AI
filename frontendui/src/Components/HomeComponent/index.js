import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const HomeComponent = () => {
    const history = useHistory()
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
    return (
        <React.Fragment>
            <div>
                <form>
                    <input type="file" accept="image/*" name="file" onChange={e => setfile(e.target.files[0])} />
                    <button onClick={upload}>Make Caption</button>
                </form>
            </div>
            <div>
                <span>{progress !== null ? `Uploading: ${progress}%` : <React.Fragment />}</span>
            </div>
        </React.Fragment>
    )
}

export default HomeComponent;