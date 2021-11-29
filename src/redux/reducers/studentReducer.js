import * as actionTypes from '../types';

const initialState = {
    studentData: [
        { id: 1, displayName: 'Mariano, Jarvis S.', section: 'BSIT 4A', rate: 0, review: 20 },
        { id: 2, displayName: 'Aguado, Jerick S.', section: 'BSIT 4A', rate: 0, review: 4 },
        { id: 3, displayName: 'Guillermo, Aldrin P.', section: 'BSIT 4A', rate: 0, review: 2 },
        { id: 4, displayName: 'Bronoso, Nico B.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 5, displayName: 'Aquino, Joe Marie R.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 6, displayName: 'Adriano, Junnie S.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 7, displayName: 'Tadeo, Angelo S.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 8, displayName: 'Del Rosario, Arjay S.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 9, displayName: 'Dela Cruz, Arjay S.', section: 'BSIT 4A', rate: 0, review: 0 },
        { id: 10, displayName: 'Dela Cruz, Juan S.', section: 'BSIT 4A', rate: 0, review: 0 },
    ],
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STUDENTS_DATA:
            return {
                ...state,
                loading: false,
                studentData: state,
            };
        default:
            return state;
    }
}

export default studentReducer;