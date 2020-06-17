import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login'
import Statistics from './pages/Statistics'
// import Err401 from './pages/401'


const AppRouter = () => (
 <Router>
  <Route exact component={Login} path="/" />
  <Route exact component={Statistics} path="/kpi" />
  {/* <Route exact component={Err401} path="/err401" /> */}
 </Router>
);

export default AppRouter;