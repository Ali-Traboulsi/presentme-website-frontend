import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableRow
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import {
    fade,
    ThemeProvider,
    withStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useForm} from "react-hook-form";
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import {baseUrl} from "../api";

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const AddEvent = props => {


    const history = useHistory();
    const classes = useStyles();
    const {handleSubmit, register} = useForm();

    const [newEvent, setNewEvent] = useState({
        event_title: "",
        event_description: "",
        event_date: "",
        image: "",
        organizer_id: "",
        sub_cat_id: "",
        event_type_id: "",
    })

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}category`);
            console.log(response);

        } catch (e) {
            console.log(e)
        }
    }

    const getSubCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}sub_category`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <div className={classes.outwards}>
                <div className={classes.container}>
                    <div>
                        <h1>ADD EVENT</h1>
                    </div>

                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <form className={classes.form} encType="multipart/form-data">
                            <Table className={classes.table} size='small' aria-label='registration table'>
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Event Title
                                    </TableCell>

                                    <TableCell>
                                        <TextField
                                            // onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            required
                                            fullWidth
                                            id="event_title"
                                            label="Event Title"
                                            name="event_title"
                                            inputRef={register}
                                            autoComplete="event_title"
                                            autoFocus
                                            placeholder="Enter Event Title"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Event Description
                                    </TableCell>
                                    <TableCell>
                                            <TextField
                                                // onChange={handlechange}
                                                variant="outlined"
                                                margin="normal"
                                                type="text"
                                                multiline
                                                required
                                                fullWidth
                                                id="event_description"
                                                label="Event Description"
                                                name="event_description"
                                                autoComplete="event_description"
                                                autoFocus
                                                inputRef={register}
                                                placeholder="Enter Event Description.."
                                                rows={4}
                                            />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell classes={classes.boldText}>
                                        Event Date
                                    </TableCell>

                                    <TableCell>
                                        <TextField
                                            // onChange={handlechange}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="event_date"
                                            label="Event Date"
                                            name="event_date"
                                            autoComplete="event_date"
                                            inputRef={register}
                                            type="date"
                                            defaultValue="yy-mm-dd"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                            {/* --------------------- Category --------------------- */}
                            <TableRow>
                                <TableCell className={classes.boldText}>
                                    Category
                                </TableCell>

                                <TableCell>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel htmlFor="filled-age-native-simple">category</InputLabel>
                                        <Select
                                            native
                                            inputRef={register}
                                            // onChange={handleChangeGender}
                                            inputProps={{
                                            }}
                                        >
                                            <option aria-label="None" value="" />

                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>

                                {/* --------------------- Sub Category --------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Sub Category
                                    </TableCell>

                                    <TableCell>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <InputLabel htmlFor="filled-age-native-simple">sub category</InputLabel>
                                            <Select
                                                native
                                                inputRef={register}
                                                // onChange={handleChangeGender}
                                                inputProps={{
                                                }}
                                            >
                                                <option aria-label="None" value="" />

                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>


                                {/* --------------------- Type --------------------- */}
                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Type
                                    </TableCell>

                                    <TableCell>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <InputLabel htmlFor="filled-age-native-simple">types</InputLabel>
                                            <Select
                                                native
                                                inputRef={register}
                                                // onChange={handleChangeGender}
                                                inputProps={{
                                                }}
                                            >
                                                <option aria-label="None" value="" />

                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className={classes.boldText}>
                                        Image
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField type="file"
                                                   // onChange={handlechangeFile}
                                                   variant='filled'
                                                   required
                                                   id="image"
                                                   name="image"
                                                   fullWidth
                                                   autoComplete="image"
                                        />
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

AddEvent.propTypes = {
    
};

const useStyles = makeStyles( (theme) => ({
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
}))


export default AddEvent;