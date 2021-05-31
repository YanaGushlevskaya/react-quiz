import React from 'react';
import style from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
  const rightAnswersCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={style.FinishedQuiz}>
      <h1>Your results:</h1>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return (
            <li className={props.results[quizItem.id] === 'success' ? style.success : style.error} key={index}>
              {index + 1}.{quizItem.question}
              <i className={(props.results[quizItem.id] === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle')} />
            </li>
          )
        })}
      </ul>
      <p>Соrrect {rightAnswersCount} of {props.quiz.length}</p>
      <div>
        <Button onClick={props.quizFinishing} type='primary'>Retry</Button>
        <Link to='/'>
          <Button onClick={props.quizFinishing} type='success'>Go to the Quiz List</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;