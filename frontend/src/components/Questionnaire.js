import React from "react";
import { Link } from 'react-router-dom';

import "./Questionnaire.css";

class Questionnaire extends React.Component {
  render() {
    const x = this.props.id;
    return (

            <li><a onClick={function() {
              this.setState = {
                step: "2",
                questionId: x
              };
      }}> {this.props.title}</a></li>

  );
  }
}
export default Questionnaire;
