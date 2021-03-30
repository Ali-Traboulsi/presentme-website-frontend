import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {logout} from "../../api";

import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Event from "./Event";
import {Redirect} from "react-router";



const Dashboard = props => {

    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const organizerFirstName = localStorage.getItem('firstName');
        const organizerLastName = localStorage.getItem('lastName');
        setFirstName(organizerFirstName);
        setLastName(organizerLastName);
        // console.log(organizerFirstName);
        // console.log(organizerLastName);

    }, [])


    const handleOnClickSignIn = () => {
        history.push('login');
    }

    const handleOnClickLogout = () => {
        logout();
        <Redirect to="/organizer/login"/>
    }


    return (
        <>
            <SideBar first={firstName} last={lastName}/>
        </>
    );
};



export default Dashboard;