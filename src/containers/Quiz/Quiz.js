import React, { Component } from 'react';
import style from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../components/axios/axios';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {},
    isQuizFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {
    const currentQuestion = this.state.quiz[this.state.activeQuestion];

    //prevent switching next question if double click on right answer
    if(this.state.answerState && this.state.answerState[answerId]) {
      return
    }

    if(currentQuestion.rightAnswerId === answerId) {
      this.setState({
        results: {[currentQuestion.id]: 'success', ...this.state.results},
        answerState: {
          [answerId]: 'success'
        }
      });
      const timeout = window.setTimeout(() => {
        if(!this.isQuizFinished()) {
          this.setState(
            (prevState,props)=>{
              return {
                activeQuestion: prevState.activeQuestion + 1,
                answerState: {}
              };
            }
         );
        } else {
          this.setState({
            isQuizFinished: true
          })
        }
        window.clearTimeout(timeout);
      }, 1000)
    } else {
      this.setState({
        results: {[currentQuestion.id]: 'error', ...this.state.results},
        answerState: {
          [answerId]: 'error'
        }
      });
    }
  }

  isQuizFinished = () => (this.state.activeQuestion+1) === this.state.quiz.length;

  onQuizFinishHandler = () => {
    this.setState({
      results: {},
      isQuizFinished: false,
      activeQuestion: 0,
      answerState: {}
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = response.data;
      console.log(...quiz);

      this.setState({
        quiz,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={style.Quiz}>
        <h1>Answer all questions</h1>

        {
          this.state.loading ?
          <Loader /> :
          this.state.isQuizFinished ?
          <FinishedQuiz
            results={this.state.results}
            quiz={this.state.quiz}
            quizFinishing={this.onQuizFinishHandler}
            /> :
          <ActiveQuiz 
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            activeQuestion={this.state.activeQuestion + 1}
            answerState={this.state.answerState}/>
        }

      </div>
    )
  }
}

export default Quiz;