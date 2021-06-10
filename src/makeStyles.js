
import { makeStyles } from '@material-ui/core/styles';

let Usestyles = makeStyles(function (theme) { return {

    main: {
        "display": 'flex',
        "flexDirection": 'column',
        "minHeight": '100vh',
        "alignItems": 'center',
        "justifyContent": 'flex-start',
        "backgroundSize": 'cover',
    },
    rel:{
        marginTop: '-15rem',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    button: {
        width: '100%',
    },
    a:{
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    actions: {
        padding: '0 1em 1em 1em',
    },

}; }, { name: 'RaLoginForm' });

export default Usestyles