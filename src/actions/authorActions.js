import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export function loadAuthorSuccess(courses) {
  return { type: types.LOAD_AUTHORS_SUCCESS, courses };
}

export function loadAuthors() {
  return function(dispatch) {
    return authorApi.getAllCourses().then(courses => {
      dispatch(loadAuthorSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
