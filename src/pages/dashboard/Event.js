import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from "react-router";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import {
    Box, Card,
    Container,
    Grid,
} from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import EventCard from "./EventCard";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Event = props => {

    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    //state
    const [data, setData] = useState({
        events: [],
        isFetching: true
    })

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setData({events: data.events, isFetching: true});
                const response = await axios.get(`http://127.0.0.1:8000/api/event`);
                console.log(response.data.data.data);
                setData({events: response.data.data.data, isFetching: false})
            } catch (err) {
                console.log(err);
                setData({events: data.events, isFetching: false})
            }
        };
        fetchEvents();
    },[])

    return (
        <>
            <Typography variant="h3" className={classes.title}>
                Your Events
            </Typography>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Toolbar />
                    <Box
                        sx={{ pt: 3 }}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            {(data.events.length != 0)
                                ? (data.events.map((val) => {
                                    return ( <Grid
                                            item
                                            key={val.id}
                                            lg={4}
                                            md={6}
                                            xs={12}
                                        >
                                            <EventCard value={val} />
                                        </Grid>)
                                }))
                                : <CircularProgress/>}

                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 3
                        }}
                    >
                    </Box>
                </Container>
            </Box>
            <Tooltip title="Add" aria-label="add" className={classes.fixed} onClick={() => history.push('/organizer/add_event')} >
                <Fab color="secondary" className={classes.absolute}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </>
    );
};

Event.propTypes = {

};


const useStyles = makeStyles( (theme) => ({
    title: {
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "cursive"
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    fixed: {
        position: "fixed"
    }
}));

export default Event;