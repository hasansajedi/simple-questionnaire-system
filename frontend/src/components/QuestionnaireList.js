import React from "react";

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class QuestionnaireList extends React.Component {

  handleClick = docTitle => {
    console.log(docTitle);
  };

  render() {
    return (
      <div>
        
        <ListGroup>
          {this.props.questionnaire.map(c =>
          <ListGroupItem key={c.id} onClick={() => this.props.handleQuestionnaireSelectedValue(c.id)}>
            <ListGroupItemHeading>{c.title}</ListGroupItemHeading>
            <ListGroupItemText>
              {c.content}
            </ListGroupItemText>
          </ListGroupItem>
        )}
        </ListGroup>
      </div>
    );
  }
}
export default QuestionnaireList;