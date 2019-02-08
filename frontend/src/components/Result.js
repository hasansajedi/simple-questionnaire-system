import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

function Result(props) {
  return (
    <div>
    <Alert color="primary">
      <h4 className="alert-heading">Well done!</h4>
        You answerd {props.answeredQuestionsCount} questions.<br/>
        {props.QAResult}
    </Alert>
  </div>
  );
}

Result.propTypes = {
  QAResult: PropTypes.string.isRequired
};

export default Result;
