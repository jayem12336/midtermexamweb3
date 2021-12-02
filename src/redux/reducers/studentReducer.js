import * as actionTypes from '../types';

const initialState = {
    studentData: [],
    studentInfo: {},
    loading: true,
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STUDENTS_DATA:
            return {
                ...state,
                loading: false,
                studentInfo: action.payload,
            };
        case actionTypes.SET_STUDENTS_LIST_DATA:
            return {
                ...state,
                loading: false,
                studentData: action.payload,
            };

        default:
            return state;
    }
}

export default studentReducer;