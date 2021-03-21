import React, {useEffect, useState} from 'react';
import {
    withStyles,
    TableContainer, Paper, Table, TableRow, TableCell, makeStyles, TextField, RadioGroup, Radio, FormControlLabel, Button, InputBase, InputLabel, FormControl, NativeSelect, Select, Box
} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {baseUrl, getGenders, organizerLogin, organizerRegister} from "../../api";
import axios from "axios";
import Typography from "@material-ui/core/Typography";


// import PropTypes from 'prop-types';

const OrganizerRegister = props => {

    const history = useHistory();

    const [registerState, setRegisterState] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        whyToJoin: "",
        dob: "",
        prevExp: "",
        gender_id: "",
        password: "",
        avatar: "",
        successMsg: null,
        level_id: 1
    });

    const [gender, setGender] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const getGenders = async () => {
        try {
            const response = await axios.get(`${baseUrl}gender`);
            console.log(response);
            // setState(prevState => ({
            //     ...prevState,
            //     'successMsg': 'Gender Fetched Successfully'
            // }))
            setGender(response.data.data.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getGenders()
        // setRegisterState({
        //     ...registerState,
        //     gender: succsess.data
        // });
        // console.log(registerState);
        // setGender(succsess.data);
        // console.log(gender);
        // const fetchGenders = async () => {
        //     // const Gendersuccess = await axios.get('http://127.0.0.1:8000/api/gender');
        //     // if (Gendersuccess) {
        //     //     console.log(Gendersuccess);
        //     //     setIsFetching(false);
        //     //     // setRegisterState({
        //     //     //         ...registerState,
        //     //     //          gender : Gendersuccess.data.data.data
        //     //     //     });
        //     //     setGender(Gendersuccess.data.data.data);
        //     //     console.log(gender);
        //     }
        //     else {
        //         console.log('success not found');
        //     }
        // };
        // fetchGenders();
    }, []);

    console.log(gender);

    // useEffect(() => {
    //     setRegisterState({
    //         ...registerState,
    //         gender: gender
    //     })
    //     console.log(gender)
    // },[gender]);

    const handlechange = (e) => {
        const {id, value} = e.target
        setRegisterState(
            prevState => ({
                ...prevState,
                [id] : value
            })
        )
    };

    const handleChangeGender = (e) => {
        e.preventDefault();
        try {
            const value = e.target.value;
            gender.map(item => item.gender_type ===  value
                ? setRegisterState({...registerState, gender_id: item.id})
                : item
            )
            console.log(registerState.gender_id);
        } catch (err) {
            console.log(err)
        }
    }

    const handleFormSubmit = async (e) => {
        const payload ={
            "email" : registerState.email,
            "DOB": registerState.DOB,
            "password": registerState.password,
            "firstName": registerState.firstName,
            "lastName": registerState.lastName,
            "username": registerState.username,
            "prevExp": registerState.prevExp,
            "whyToJoin": registerState.whyToJoin,
            "avatar": registerState.avatar,
            "gender_id": registerState.gender_id
        }

        try {

            const registerSuccess = await organizerRegister(payload, setRegisterState);
            if (registerSuccess) {
                history.push('/organizer/dashboard');
            }
            else {
                alert("register Unsuccessful")
                history.push('/organizer/register');
            }

        } catch (e) {
            console.log(e)
        }
    };

    const handlechangeFile = (e) => {
        e.preventDefault();
        setAvatar(e.target.files[0]);
        console.log(avatar);
    }


    const newHandleSubmit = async (e) => {
        try {
            console.log('entered submit try block')
            const formdata = new FormData();
            formdata.append('email', registerState.email);
            formdata.append('dob', registerState.dob);
            formdata.append('firstName', registerState.firstName);
            formdata.append('lastName', registerState.lastName);
            formdata.append('password', registerState.password);
            formdata.append('gender_id', registerState.gender_id);
            formdata.append('prevExp', registerState.prevExp);
            formdata.append('whyToJoin', registerState.whyToJoin);
            formdata.append('username', registerState.username);
            formdata.append('avatar', avatar);
            formdata.append('level_id', 1);

            const registersuccess = await axios.post(`${baseUrl}organizer/register`, formdata);

            if (registersuccess) {
                history.push('/organizer/dashboard')
            }

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const classes = useStyles();
    const {handleSubmit, register} = useForm();
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    return (
        <>
            <div className={classes.outwards}>
                <div className={classes.container}>
                    <div>
                        <h1>Presenter Registration</h1>
                    </div>

                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <form className={classes.form} onSubmit={handleSubmit(newHandleSubmit)} encType="multipart/form-data">
                            <Table className={classes.table} size='small' aria-label='registration table'>

                                {/* ----------------------- First Name ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        First Name
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            inputRef={register}
                                            autoComplete="firstName"
                                            autoFocus
                                            placeholder="Enter Your First Name"
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- Last Name ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Last Name
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lastName"
                                            autoFocus
                                            inputRef={register}
                                            placeholder="Enter Your Last Name"
                                        />
                                    </TableCell>
                                </TableRow>


                                {/* ----------------------- UserName ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Username
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                            inputRef={register}
                                            placeholder="Enter Your Username"
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- Email ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Email
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="email"
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
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- Password ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Password
                                    </TableCell>

                                    <TableCell align='right'>
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
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- DOB ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Date Of Birth
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="dob"
                                            label="dob"
                                            name="dob"
                                            autoComplete="dob"
                                            inputRef={register}
                                            type="date"
                                            defaultValue="yy-mm-dd"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- Gender ----------------------- */}
                            {/*    <TableRow>*/}
                            {/*    <TableCell className={classes.boldText}>Gender</TableCell>*/}
                            {/*    <TableCell>*/}
                            {/*        <div>*/}
                            {/*            <RadioGroup row aria-label="gender" name="gender" onChange={handleChangeGender}>*/}
                            {/*                {*/}
                            {/*                    // console.log(gender.length)*/}
                            {/*                    // (gender.length != 0)*/}
                            {/*                    //     ? gender.map((val) =>*/}
                            {/*                    //         <FormControlLabel value={val.id} control={<Radio/>} onChange={handleChangeGender} />*/}
                            {/*                    //     )*/}
                            {/*                    //     : null*/}
                            {/*                }*/}
                            {/*                /!*<FormControlLabel value="1" control={<Radio />} label="Movie" />*!/*/}
                            {/*                /!*<FormControlLabel value="2" control={<Radio />} label="Serie" />*!/*/}
                            {/*            </RadioGroup>*/}
                            {/*        </div>*/}
                            {/*    </TableCell>*/}
                            {/*</TableRow>*/}
                                <TableRow>
                                    <TableCell className={classes.boldText}>Genders</TableCell>
                                    <TableCell>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <InputLabel htmlFor="filled-age-native-simple">Genders</InputLabel>
                                            <Select
                                                native
                                                inputRef={register}
                                                onChange={handleChangeGender}
                                                inputProps={{
                                                }}
                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    (gender.length != 0)
                                                        ? gender.map(val => <option key={val.id}>{val.gender_type}</option>)
                                                        : null
                                                }

                                            </Select>
                                            {/*{console.log(this.state.genres)}*/}
                                        </FormControl>
                                        {/* type="text" */}
                                        {/* onChange={this.handleChange}
                                        variant='filled'
                                        required
                                        id="genres"
                                        name="genres"
                                        label="Genres"
                                        fullWidth
                                        autoComplete="genres"
                                    />  */}
                                    </TableCell>
                                </TableRow>

                                {/* ----------------------- Why To Join ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Why Join Us
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            multiline
                                            required
                                            fullWidth
                                            id="whyToJoin"
                                            label="why-join-us"
                                            name="whyToJoin"
                                            autoComplete="whyToJoin"
                                            autoFocus
                                            inputRef={register}
                                            placeholder="Please Type Why You Want To Join Us.."
                                            rows={4}
                                        />
                                    </TableCell>
                                </TableRow>


                                {/* ----------------------- Why To Join ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Previous Experience
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            multiline
                                            required
                                            fullWidth
                                            id="prevExp"
                                            label="previous-experience"
                                            name="prevExp"
                                            autoComplete="prevExp"
                                            autoFocus
                                            inputRef={register}
                                            placeholder="Please Type Why You Previous Knowledge in Public Speaking.."
                                            rows={4}
                                        />
                                    </TableCell>
                                </TableRow>


                                {/* ----------------------- Avatar ----------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Avatar
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField type="file"
                                               onChange={handlechangeFile}
                                               variant='filled'
                                               required
                                               id="avatar"
                                               name="avatar"
                                               label="avatar"
                                               fullWidth
                                               autoComplete="avatar"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Button
                                            className= {classes.submit}
                                            type="submit"
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                        >Submit
                                        </Button>
                                    </TableCell>
                                </TableRow>


                            </Table>
                        </form>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

// OrganizerRegister.propTypes = {
//
// };

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
    logo: {
        marginRight: '200',
    },
    outwards: {
        position: 'absolute',
        // backgroundColor: '#1b262c',
        height: "100%",
        width: '100%',
    },
    container: {
        height: "100%",
        marginBottom: 16,
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    tableContainer: {
        maxWidth: 800,
    },
    table: {
        minWidth: 650,
        // maxWidth: 'md'
    },
    boldText: {
        fontWeight: 'bold'
    },
}));

export default OrganizerRegister;