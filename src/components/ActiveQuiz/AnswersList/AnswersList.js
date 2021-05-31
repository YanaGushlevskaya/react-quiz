import React from 'react';
import style from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => {
  return (
    <ul className={style.AnswersList}>
      {props.answers.map((answer,index) => {
        return <AnswerItem
          answer={answer}
          key={index}
          onAnswerClick={props.onAnswerClick}
          answerState={props.answerState ? props.answerState[answer.id] : null}
        />
      })}
    </ul>
  )
}

export default AnswersList;