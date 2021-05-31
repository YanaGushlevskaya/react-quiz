import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/quiz-creator" component={QuizCreator}></Route>
        <Route path="/quiz/:id" component={Quiz}></Route>
        <Route path="/" component={QuizList}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
