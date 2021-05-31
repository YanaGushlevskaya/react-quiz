import React from 'react';
import style from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => {
  return (
    <div className={style.ActiveQuiz}>
      <div className={style.header}>
        <p >
          {props.question}
        </p>
        <small>{props.activeQuestion}/{props.quizLength}</small>
      </div>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        answerState={props.answerState}
      />
    </div>
  )
}

export default ActiveQuiz;