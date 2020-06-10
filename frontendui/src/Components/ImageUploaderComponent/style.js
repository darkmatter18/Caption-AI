import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    fileContainer: {
        background: '#ffffff',
        position: 'relative',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    errorsContainer: {
        maxWidth: 300,
        fontSize: 12,
        color: theme.palette.error.main,
        textAlign: 'left'
    },
    uploadPicturesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    uploadPictureContainer: {
        width: '65%',
        background: '#edf2f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%',
        boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative'
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