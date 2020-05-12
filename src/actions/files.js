import axios from 'axios';
import {FILE_DELETE, FILES_LOADING, GET_ERRORS, GET_FILES} from './types';
import {tokenConfig} from "./auth";
import {getTracks} from "./tracks";

// GET LIST OF USER'S FILES
export const getFiles = () => async (dispatch, getState) => {
    dispatch({ type: FILES_LOADING});

    try {
        let response = await axios.get("http://localhost:8000/api/files/", tokenConfig(getState));
        dispatch({ type: GET_FILES, payload: response.data });
    } catch (e) {
        console.log(e);
        // const errors = {
        //     msg: e.response.data,
        //     status: e.response.status
        // };
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: errors
        // });
    }

};

// UPLOAD NEW FILE
export const uploadFile = (file, title) => (dispatch, getState) => {
    //Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    const data = new FormData();
    data.append('gpx_file', file);
    data.append('title', title);

    axios.post("http://localhost:8000/api/files/", data, config)
        .then(() => {
            dispatch(getFiles());
            dispatch(getTracks());
        })
        .catch((e) => {
            const errors = {
                msg: e.response.data,
                status: e.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        })
};

// DELETE FILE
export const deleteFile = (id) => (dispatch, getState) => {
    axios.delete(`http://localhost:8000/api/files/${id}`, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: FILE_DELETE,
                payload: id
            });

            dispatch(getTracks());
        })
        .catch(err => console.log(err))
};