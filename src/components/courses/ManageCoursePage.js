import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';


class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: props.course,
      errors: {},
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.course.id !== nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  saveCourse = (event) => {
    event.preventDefault();
    this.setState({ saving: true });
    let promise = this.props.actions.saveCourse(this.state.course);

    promise.then(() => {
      this.setState({ saving: false });
      toastr.success('Course Saved!');
      this.context.router.push('/courses');
    }).catch((error) => {
          this.setState({ saving: false });
          toastr.error(error);
    });
  };


  updateCourseState = (event) => {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({
      course: course
    });
  };

  render() {
    return(
        <CourseForm onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    allAuthors={this.props.authors}
                    saving={this.state.saving}
                    />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  const course = courses.filter(course => course.id === courseId);
  return course.length > 0? course[0] : null;
}

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id;

  let newCourse = {
    id: "",
    title: "",
    watchHref: "",
    authorId: "",
    length: "",
    category: ""
  };

  let course = courseId && state.courses.length > 0? getCourseById(state.courses, courseId) : newCourse;

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
