import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component{
  constructor(props, context) {
    super(props, context);
  }

  courseRow = (course,index) => {
    return <div key={index}>{course.title}</div>
  }

  render() {
    const {courses} = this.props;
    return(
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  }
}
/*
function mapDispatchToProps(dispatch) {
  return {
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
}
*/

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// if mapDispatchToProps is not define as a second param,
// connect add method dispatch as prop to the component
