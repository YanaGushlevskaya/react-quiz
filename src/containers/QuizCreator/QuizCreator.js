import React, { Component, createContext } from 'react';
import style from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from '../../components/axios/axios';

function createOptionControl(number) {
  return createControl({
    label: `${number} variant`,
    errorMessage: 'Variant can not be empty',
    id: number
  }, { required: true })
}

function createFormControls() {
  return (
    {
      question: createControl({
        label: ' Ask a question',
        errorMessage: 'Question can not be empty'
      }, { required: true }),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4),
    }
  )
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    formControls: createFormControls(),
    rightAnswerId: 1,
  }

  submitHandler = event => {
    event.preventDefault();
  }

  addQuestionHandler = event => {
    event.preventDefault();

    const quiz = [...this.state.quiz];
    const index = quiz.length + 1;
    const {question, option1, option2, option3, option4} = this.state.formControls;

    const quizItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    quiz.push(quizItem);

    this.setState({
      quiz,
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1,
    })
  }

  createQuizHandler = async event => {
    try {
      await axios.post('/quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1,
      });
    } catch(error) {
      console.log(error);
    }
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = formControls[controlName];

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({ isFormValid: validateForm(formControls), formControls });
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={`${controlName} + ${index}`}>
          <Input
            type={control.type}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          {index === 0 && <hr />}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    return (
      <div className={style.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderInputs()}

            <Select
              label="Choose the right answer"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            />

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator;