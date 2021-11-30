import { useEffect } from 'react';
import * as actionTypes from '../types';
import { db } from '../../utils/firebase'
import { onSnapshot, collection } from 'firebase/firestore';


useEffect(
    () =>
        onSnapshot(collection(db, "studentlist"), (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }
        ),
    []
);

const initialState = {
    studentData: [],
    studentInfo: {}
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STUDENTS_DATA:
            return {
                ...state,
                loading: false,
                studentData: action.payload,
            };
        case actionTypes.GET_STUDENTS_DATA:
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