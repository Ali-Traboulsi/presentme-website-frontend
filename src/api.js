import axios from "axios";
import {ACCESS_TOKEN_NAME, USER_NAME} from "./constants/apiConstants";

export const baseUrl = 'http://127.0.0.1:8000/api/';


export const organizerLogin = async (data, setState) => {
    try {

        const response = await axios.post(`${baseUrl}organizer/login`, data);
        console.log(response);

        if (response.status === 200 && response.data.token) {
            setState(prevState => ({
                ...prevState,
                'successMsg': 'Login Successful. Redirecting to Dashboard'
            }))

            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            localStorage.setItem('firstName', response.data.data.firstName);
            localStorage.setItem('lastName', response.data.data.lastName);

            return response.data;
        }
    } catch
        (e) {
                console.log(e)
            }
}


export const organizerRegister = async (data, setState) => {
    try {
        const response = await axios.post(`${baseUrl}organizer/register`, data)
        console.log(response);

        setState(prevState => ({
            ...prevState,
            'successMsg': 'Registration Successful. Redirecting to Dashboard'
        }))

        return response.data;

    } catch (e) {
        console.log(e);
    }
}

export const getGenders = async (setState) => {
    try {
        const response = await axios.get(`${baseUrl}gender`);
        console.log(response);
        // setState(prevState => ({
        //     ...prevState,
        //     'successMsg': 'Gender Fetched Successfully'
        // }))
        setState(response.data)

        return response.data;

    } catch (e) {
        console.log(e)
    }
}

export const logout = () => {
    try {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
    } catch (e) {
        console.log(e)
    }
}
