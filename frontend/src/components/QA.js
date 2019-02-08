import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import AnswerOption from './AnswerOption';

function QA(props) {
  var stringValue = props.answerOptions;
  let answers = stringValue.split(",").map(String);

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answerType={key}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
      <div key={props.questionId}>
        <Question content={props.question} />
        <ul className="answerOptions">
            {answers.map(renderAnswerOptions)}
        </ul>
      </div>
  );
}

QA.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default QA;
