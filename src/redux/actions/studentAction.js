import * as actionTypes from '../types';

export const toggleStudentData = (studentData, history) => async (dispatch) => {
    try {
        localStorage.setItem('studentdata', JSON.stringify(studentData));
        dispatch({ type: actionTypes.SET_STUDENTS_DATA, payload: studentData });
        history.push(`/studentevaluation/${studentData.id}`)
    } catch (err) {
        console.error(err);
    }
};

export const updateStudentData = (studentData) => async (dispatch) => {
    try {
        localStorage.setItem('studentdata', JSON.stringify(studentData));
    } catch (err) {
        console.error(err);
    }
};


export const getStudentData = () => async (dispatch) => {
    try {
        const studentData =
            localStorage.getItem('studentdata');
        dispatch({ type: actionTypes.SET_STUDENTS_DATA, payload: JSON.parse(studentData) });
    } catch (err) {
        console.error(err);
    }
};

export const toggleStudentListData = (fetchStudent) => async (dispatch) => {
    try {
        localStorage.setItem('studentlistdata', JSON.stringify(fetchStudent));
        dispatch({ type: actionTypes.SET_STUDENTS_LIST_DATA, payload: fetchStudent });
    } catch (err) {
        console.error(err);
    }
};

export const getStudentListData = () => async (dispatch) => {
    try {
        const fetchStudent =
            localStorage.getItem('studentlistdata');
        dispatch({ type: actionTypes.SET_STUDENTS_LIST_DATA, payload: JSON.parse(fetchStudent) });
    } catch (err) {
        console.error(err);
    }
};






