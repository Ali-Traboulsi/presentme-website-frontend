import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect, useHistory
} from 'react-router-dom';

import OrganizerSignIn from "../pages/authentication/OrganizerSignIn";
import Home from "../pages/home/home";
import OrganizerRegister from "../pages/authentication/OrganizerRegister";
import Dashboard from "../pages/dashboard/dashboard";
import Event from "../pages/dashboard/Event";
import AddEvent from "../components/addEvent";

const authRoute = (Component) => () => {
    // const response = await adminLogin(data);

    if (localStorage.getItem('access_token')) {
        return <Component />
    } else {
        return <Redirect to='/organizer/login' />
    }
}


const Routes = props => {
    return (
        <Router {...props}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path='/organizer/login' component={OrganizerSignIn}/>
                <Route path='/home' component={Home}/>
                <Route path='/organizer/register' component={OrganizerRegister}/>
                <Route path='/organizer/dashboard' component={authRoute(Dashboard)}/>
                <Route path='/organizer/dashboard/events' component={authRoute(Event)}/>
                <Route path='/organizer/add_event' component={authRoute(AddEvent)}/>
                {/*<Route path='/admin' component={authRoute()}/>*/}
            </Switch>
        </Router>
    );
};


export default Routes;