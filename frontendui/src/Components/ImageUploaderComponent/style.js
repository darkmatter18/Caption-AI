/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    fileContainer: {
        background: '#ffffff',
        position: 'relative',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '23rem'
    },
    errorsContainer: {
        maxWidth: 300,
        fontSize: 12,
        color: theme.palette.error.main,
        textAlign: 'left'
    },
    uploadPictureContainer: {
        background: '#edf2f6',
        height: '20rem',
        width: '20rem',
        justifyContent: 'center',
        boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.1)',
    },
    deleteImage: {
        position: 'absolute',
        top: '-9px',
        right: '-9px',
        color: '#ffffff',
        background: '#ff4081',
        borderRadius: '50%',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '26px',
        fontWeight: 'bold',
        lineHeight: 30,
        width: 30,
        height: 30
    }
}));