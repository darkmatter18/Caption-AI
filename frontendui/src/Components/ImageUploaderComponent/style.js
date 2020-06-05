import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    fileContainer: {
        background: '#ffffff',
        boxShadow: '2px 2px 3px 0 rgba(0, 0, 0, 0.05)',
        position: 'relative',
        borderRadius: 10,
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '10px auto',
        transition: 'all 0.3s ease-in'
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
        width: '100%'
    },
    uploadPictureContainer: {
        width: '25%',
        margin: '5%',
        padding: '10px',
        background: '#edf2f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'inherit',
        boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.1)',
        border: '1px solid #d0dbe4',
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