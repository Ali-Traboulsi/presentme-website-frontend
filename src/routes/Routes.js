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

const authRoute = (Component) => () => {
    // const response = await adminLogin(data);

    if (localStorage.getItem('access_token')) {
        return <Component />
    } else {
        return <Redirect to='/login' />
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
                {/*<Route path='/home/dashboard' component={authRoute()}/>*/}
                {/*<Route path='/admin' component={authRoute()}/>*/}
            </Switch>
        </Router>
    );
};


export default Routes;