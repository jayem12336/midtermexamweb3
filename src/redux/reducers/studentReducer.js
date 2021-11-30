import * as actionTypes from '../types';

const initialState = {
    studentData: [
        { id: 1, displayName: 'Mariano, Jarvis S.', section: 'BSIT 4A', rate: 0, review: 20, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 2, displayName: 'Aguado, Jerick S.', section: 'BSIT 4A', rate: 0, review: 4, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 3, displayName: 'Guillermo, Aldrin P.', section: 'BSIT 4A', rate: 0, review: 2, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 4, displayName: 'Bronoso, Nico B.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 5, displayName: 'Aquino, Joe Marie R.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 6, displayName: 'Adriano, Junnie S.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 7, displayName: 'Tadeo, Angelo S.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 8, displayName: 'Del Rosario, Arjay S.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 9, displayName: 'Dela Cruz, Arjay S.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
        { id: 10, displayName: 'Dela Cruz, Juan S.', section: 'BSIT 4A', rate: 0, review: 0, gender: 'male', birthday: '02-22-1990', address: 'Pandi Bulacan', nickname: 'kokoy', skills: 'JavaScript, Python' },
    ],
    studentInfo: {}
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STUDENTS_DATA:
            return {
                ...state,
                loading: false,
                studentInfo: action.payload,
            };

        default:
            return state;
    }
}

export default studentReducer;