import * as actionTypes from '../types';

export const toggleStudentData = (studentData) => async (dispatch) => {
    try {
        localStorage.setItem('studentData' , JSON.stringify(studentData));
        dispatch({ type: actionTypes.SET_STUDENTS_DATA, payload: studentData });
    } catch (err) {
        console.error(err);
    }
};

export const getClassroomData = () => async (dispatch) => {
    try {
        const classData = 
        localStorage.getItem('classdata');
        dispatch({ type: actionTypes.GET_STUDENTS_DATA, payload: JSON.parse(studentData)});
    } catch (err) {
        console.error(err);
    }
};








