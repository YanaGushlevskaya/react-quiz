import React, { Component } from 'react';
import style from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from '../../components/axios/axios';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizList = () => {
    return (this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    }))
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key,index) => {
        quizes.push({
          id: key,
          name: `Test #${index+1}`
        })
      })

      this.setState({
        quizes,
        loading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={style.QuizListWrapper}>
        <h1>QuizList</h1>

        {
          this.state.loading ? 
          <Loader /> :
          <ul className={style.QuizList}>
            {this.renderQuizList()}
          </ul>
        }
      </div>
    )
  }
}

export default QuizList;