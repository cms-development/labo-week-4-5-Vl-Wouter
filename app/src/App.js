import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
// import logo from './logo.svg';
import './App.scss';
// Import Pages
import Home from './pages/Home'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

// Import Admin Pages
import Creatures from './pages/admin/Creatures';

// Import Components
import Header from './components/Header'
import UserContextProvider from './contexts/UserContext';
import Creature from './pages/admin/Creature';
import Delete from './pages/admin/Delete';

// .env support
require('dotenv').config()


function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/admin/creatures">
              <Creatures />
            </Route>
            <Route exact path="/admin/creatures/:id/delete" component={Delete} />
            <Route path="/admin/creatures/:id" component={Creature} />
            <Route path="/admin/*">
              <NotFound />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/:id">
              <Detail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
