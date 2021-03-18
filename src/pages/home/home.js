import React from 'react';
import {useHistory} from 'react-router-dom';
import {red} from "@material-ui/core/colors";

const Home = props => {

    const history = useHistory();

    const redirectToLogin = () => {
        history.push('/organizer/login');
    }

    return (
        <button onClick={redirectToLogin}>
            Organizer Login
        </button>
    );
};



export default Home;