import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';

import QA from './components/QA';
import Result from './components/Result';
import './App.css';

import QuestionnaireList from "./components/QuestionnaireList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step:1,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: '',
      questionDetails: [],
      answer: '',
      selectedAnswer: '',
      selectedAnswerLog: '',
      path: '',
      is_last: false,
      url: '',
      result: '',
      questionnaires:[]
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.refreshQuestionnaireList = this.refreshQuestionnaireList.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.handleQuestionnaireSelected = this.handleQuestionnaireSelected.bind(this);
  }

  componentDidMount() {
        this.refreshQuestionnaireList();
        this.refreshList(this.state.questionId);
  }

  handleQuestionnaireSelected = (step) => {
      const selectedQID = step;
      this.setState({
          step:2,
          questionId : step,
          url: 'http://localhost:8000/qad/'+selectedQID+'/questionnaire.q'+selectedQID+'.question_number_'+selectedQID
      });
      setTimeout(() => this.refreshList(step), 300);
  }

  refreshQuestionnaireList = () =>{
      axios
      .get("http://localhost:8000/api/questionnaires/")
      .then(response => {
        const newQuestionnaires = response.data.map(c => {
          return {
            id: c.id,
            title: c.title,
            content: c.content
          };
        });
        const newState = Object.assign({}, this.state, {
          questionnaires: newQuestionnaires
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  refreshList = (qid) => {
    if(this.state.step === 2)
    {
      if(this.state.selectedAnswer !== '') {
          this.setState({
            url: "http://localhost:8000/qad/"+qid+"/questionnaire.q"+qid+".question_number_"+ qid + this.state.selectedAnswer
          })
      }
      else{
        this.setState({
          url: this.state.url
      });
      }
      
      axios
          .get(this.state.url)
          .then(res => {
              this.setState({
                  question: res.data[0].title,
                  result: res.data[0].response,
                  questionId: res.data[0].pid,
                  answerOptions: res.data[0].response,
                  is_last: res.data[0].is_last,
                  path: res.data[0].path,
                  shuffledAnswerOptions: res.data[0].response
              })
          })
          .catch(err => console.log(err));
      
      if (this.state.is_last) {
          setTimeout(() => this.setResults(), 300);
      }
    }
   };

  handleAnswerSelected(event) {
    this.setState({
            selectedAnswer: this.state.selectedAnswer + "." + event.currentTarget.value,
            selectedAnswerLog: this.state.selectedAnswerLog + " > " + this.state.question + " > " + event.currentTarget.value,
            counter : this.state.counter+1
        })
    this.setUserAnswer(event.currentTarget.value);
    if (!this.state.is_last) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answer: answer
    }));
  }

  setNextQuestion() {
    const questionId = this.state.questionId;
    this.refreshList(this.state.questionId);

    if(!this.state.is_last) {
        this.setState({
            questionId: questionId,
            answer: ''
        });
    }
    else{
      setTimeout(() => this.setResults(), 300);
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults() {
      this.setState({ result: this.state.response });
  }

  renderQA() {
    return (
      <QA
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    console.log(this.state.selectedAnswerLog);
    return <Result 
    QAResult={this.state.result} 
    answeredQuestionsCount={this.state.counter}
    answeredQuestionsSelected={this.state.selectedAnswer} />;
  }

  renderQuestionnaire() {
      return <QuestionnaireList questionnaire={this.state.questionnaires} handleQuestionnaireSelectedValue={this.handleQuestionnaireSelected} />;
  }

  render() {
    return (
      <div className="App">
          <div className="App-header">
            <img src='https://hiariana.com/wp-content/uploads/2017/09/ariana_logo_blue_small_XS.png' className="App-logo" alt="logo" />
            <h2>Hi Ariana, Questionnaire app</h2>
          </div>
      <Container>
        <Row>
          <Col>
                  <div className="left floated">
                  </div>
                  <div className="right floated">
                      { this.state.step === 2 ? (this.state.is_last ? this.renderResult(): this.renderQA()):this.renderQuestionnaire()}
                  </div>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default App;
