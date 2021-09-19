import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './dashboard/Dashboard';
import Header from './components/Header';
import Mensagens from './mensagens/Mensagens';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './mirage/server';
import Login from './login/Login';

ReactDOM.render(

  <Router>

    <Switch>
      <Route path="/Dashboard" title="Dashboard">
        <Header></Header>
        <Dashboard />
      </Route>
      <Route path="/Mensagens" title="Mensagens">
        <Header></Header>
        <Mensagens />
      </Route>
      <Route exact path="/" component={Login} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
