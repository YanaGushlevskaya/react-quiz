import React from 'react';
import style from './AnswerItem.module.css';

const AnswerItem = props => {
  const answerStatus = [style.AnswerItem];

  if(props.answerState) {
    answerStatus.push(style[props.answerState])
  }

  return (
    <li className={answerStatus.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
      {props.answer.text}
    </li>
  )
}

export default AnswerItem;