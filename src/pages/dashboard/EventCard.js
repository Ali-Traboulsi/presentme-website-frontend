import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import axios from "axios";


const EventCard = props => {

    const classes = useStyles();
    console.log(props)
    const image_url = `http://127.0.0.1:8000/storage/events/${props.value.sub_cat_id}/${props.value.image}`;

    const [currentEvent, setCurrentEvent] = useState({...props.value})
    console.log('current_event : ' + currentEvent);

    const [newdata, setNewData] = useState({...currentEvent});

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [imageURL, setImageURL] = useState(image_url);

    console.log(newdata);

    // const [editing, setEditing] = useState(false);
    // const [newImage, setNewImage] = useState("");
    // const [newImageURL, setNewImageURL] = useState('');
    // const [eventTitle, setEventTitle] = useState('');
    // const [eventDesc, setEventDesc] = useState('');
    // const [eventDate, setEventDate] = useState('');
    // const [subCatName, setSubCatName] = useState('');


    const handleChange = (e) => {
        e.preventDefault();
        console.log(newdata);
        console.log('change value to' + e.target.value);
        setNewData({[e.target.name]: e.target.value});
    }
    //
    const clickEdit = () => {
        setIsEditing(true)
    }

    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/organizer/update_event/${currentEvent.id}`, newdata);
            console.log(response);
            setIsEditing(false)
        } catch (err) {
            console.log(err)
            setIsEditing(false)
        }
    };
    //
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await axios.delete(`http://127.0.0.1:8000/api/organizer/delete_event/${currentEvent.id}`);
            console.log(response);
        } catch (err) {
            console.log(err)
            setIsDeleting(false)
        }
    };
    //
    const handlechangeImage = (e) => {
        e.preventDefault();
        setNewData({[e.target.name]: e.target.files[0]});
        setImageURL(`http://127.0.0.1:8000/storage/events/${newdata.sub_cat_id}/${newdata.image}`);
        console.log(newdata.image);
        console.log(imageURL);
    }

    return (
        <>
            {console.log(isEditing)}
            <Card className={classes.root}>
                <CardActionArea>
                    {(isEditing)
                        ?
                        (<div>
                            <input
                                accept="image/*"
                                name="image"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={() => handlechangeImage}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                Upload
                                </Button>
                            </label>
                        </div>)
                        : (<CardMedia
                            className={classes.media}
                            image={image_url}
                            // image="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
                            title={props.value.image}
                            // title="Hello World"
                        />)
                    }
                    <CardContent>
                        {(isEditing)
                            ? (
                                <>
                                    <TextField
                                        id="outlined-helperText"
                                        label="Event Title"
                                        defaultValue={currentEvent.event_title}
                                        helperText="Update event title"
                                        variant="outlined"
                                        onChange={() => handleChange}
                                        name="event_title"
                                    />
                                    <TextField
                                        id="outlined-helperText"
                                        name="event_description"
                                        defaultValue={currentEvent.event_description}
                                        helperText="Update event description"
                                        // onChange={handleChange}
                                        variant="outlined"
                                        rows={4}
                                    />
                                </>
                            )
                            : (
                                <>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {props.value.event_title}
                                        {/*Hello World*/}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {props.value.event_description}
                                        {/*This is my description*/}
                                    </Typography>
                                </>
                            )
                        }
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {(isEditing)
                        ? (
                            <>
                                <TextField
                                    id="event_date"
                                    name="event_date"
                                    type="date"
                                    defaultValue={props.value.event_date}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Chip label={<TextField
                                    // onChange={handleChange}
                                    id="sub_category" name="subCategory_name" defaultValue={newdata.sub_categories.subCategory_name} />} />
                                <Chip
                                    avatar={<Avatar>{newdata.event_types.type_name[0]}</Avatar>}
                                    label={<TextField
                                        // onChange={handleChange}
                                        name="type_name" defaultValue={newdata.event_types.type_name}/>}
                                    variant="outlined"
                                />
                                </>
                        )
                        : (
                            <>
                                <Typography>
                                    {props.value.event_date}
                                </Typography>
                                <Chip label={props.value.sub_categories.subCategory_name} />
                                <Chip
                                    avatar={<Avatar>{props.value.event_types.type_name[0]}</Avatar>}
                                    label={props.value.event_types.type_name}
                                    variant="outlined"
                                />

                            </>
                        )
                    }
                    <IconButton aria-label="delete"
                                onClick={() => handleDelete()}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit"
                                onClick={() => clickEdit()}
                    >
                        <CreateIcon />
                    </IconButton>
                    {(isEditing)
                        ?
                        <Button variant="outlined" color="Update"
                                onClick={() => handleEdit()}
                        >
                            Secondary
                        </Button>
                        : null
                    }
                </CardActions>
            </Card>
        </>
    );
};

EventCard.propTypes = {

};

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 300,
        objectFit: "scale-down",
    },
});

export default EventCard;