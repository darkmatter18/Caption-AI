import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const HomeComponent = () => {
    const history = useHistory()
    const [file, setfile] = useState(null);

    const uploadApi = async (data) => {
        try {
            const res = await axios.post('/api/analyze', data, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            history.push('/result', {res: res.data});
        } catch (e) {
            console.log(e);
        }   
    }

    const upload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        
        uploadApi(formData);
    }
    return (
        <div>
            <form>
                <input type="file" name="file" onChange={e => setfile(e.target.files[0])} />
                <button onClick={upload}>Make Caption</button>
            </form>
        </div>
    )
}

export default HomeComponent;