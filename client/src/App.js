import React, { Fragment, useEffect } from 'react';
import Login from './components/auth/Login';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/layout/Landing';
import Subjects from './components/pages/Subjects/Subjects';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import Topics from './components/pages/Topics/Topics';
import Subtopics from './components/pages/Subtopics/Subtopics';
import { Scrollbars } from 'react-custom-scrollbars';
import Bookmarks from './components/pages/Bookmarks/Bookmarks';
import { loadUserSubjects } from './actions/subject';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadUserSubjects());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Scrollbars style={{ height: '100vh' }}>
          <Fragment>
            <NavBar />
            <Route exact path='/' component={Landing} />
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
              <PrivateRoute exact path='/subjects' component={Subjects} />
              <PrivateRoute
                exact
                path='/topics/:subName/:subId'
                component={Topics}
              />
              <PrivateRoute
                exact
                path='/subtopics/:subName/:subId/:tpName/:tpId'
                component={Subtopics}
              />
              <PrivateRoute
                exact
                path='/bookmarks/:subName/:subId/:tpName/:tpId/:subTpName/:subTpId'
                component={Bookmarks}
              />
            </Switch>
          </Fragment>
        </Scrollbars>
      </Router>
    </Provider>
  );
};

export default App;
