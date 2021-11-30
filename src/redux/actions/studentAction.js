import * as actionTypes from '../types';

export const toggleStudentData = (studentInfo , history) => async (dispatch) => {
    try {
        localStorage.setItem('studentInfo' , JSON.stringify(studentInfo));
        dispatch({ type: actionTypes.SET_STUDENTS_DATA, payload: studentInfo });
        history.push(`/studentevaluation/${studentInfo.id}`)
    } catch (err) {
        console.error(err);
    }
};

export const getStudentData = () => async (dispatch) => {
    try {
        const studentInfo = 
        localStorage.getItem('studentInfo');
        dispatch({ type: actionTypes.GET_STUDENTS_DATA, payload: JSON.parse(studentInfo)});
    } catch (err) {
        console.error(err);
    }
};








