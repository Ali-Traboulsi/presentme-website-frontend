import React, {useState} from 'react';
import {ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
} from '@material-ui/core'

// import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";


const OrganizerSignIn = () => {

    const history = useHistory();

    const [state, setState] = useState({
        email: "",
        password: "",
        successMsg: null
    });


    const handlechange = (e) => {
        const {id, value} = e.target
        setState(
            prevState => ({
                ...prevState,
                [id] : value
            })
        )
    };

    const handleSubmitClick = async (e) => {
        const payload ={
            "email" : state.email,
            "password": state.password
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/organizer/login`, payload);
            console.log(response);

            if (response.status === 200 && response.data.token) {
                setState(prevState => ({
                    ...prevState,
                    'successMsg': 'Login Successful. Redirecting to Dashboard'
                }))

                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
                // redirectToDashboard();
                redirectToHome();
            }
        } catch (e) {
            console.log(e)
        }
    };

    const redirectToDashboard = () => {
        history.push('/Dashboard');
    }

    const redirectToHome = () => {
        history.push('/home')
    }

    const redirectToOrganizerRegister = () => {
        history.push('/organizer/register');
    }

    const classes = useStyles()
    const {handleSubmit, register} = useForm();


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />
                <Typography component="h1" variant="h5" >
                    Sign in, Organizer!
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(handleSubmitClick)} >
                    <TextField
                        onChange={handlechange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register}
                        placeholder="Enter Email"
                    />

                    <TextField
                        onChange={handlechange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        inputRef={register}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        Sign In
                    </Button>
                </form>
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToOrganizerRegister()}>Register</span>
            </div>

            <Box mt={8} >
                <CopyRight />
            </Box>
        </Container>
    );
};

const CopyRight = () => (
    <Typography  >
        {'Copyright ©'}
        {new Date().getFullYear()}
    </Typography>
)

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default OrganizerSignIn;