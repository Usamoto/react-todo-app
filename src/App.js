import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Categories from './components/categories';
import CategoryTasks from './components/categoryTasks';
import './App.css';
import 'reset-css';

import Header from './components/header';

function App() {
  const history = useHistory();
  const [path, setPath] = useState('/');
  const [headerColor, setHeaderColor] = useState('');

  useEffect(() => {
    return history.listen((location) => {
      setPath(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    setHeaderColor('');
  }, [path]);

  return (
    <div className="App">
      <Header theme={headerColor} />
      <Route
        render={({ location }) => (
          <SwitchTransition mode="out-in">
            <CSSTransition key={location.key} timeout={200} classNames="route">
              <div className="container">
                <div className="component-container">
                  <Switch>
                    <Route path="/" exact component={Categories} />

                    <Route
                      path="/category/:id"
                      render={(props) => (
                        <CategoryTasks
                          {...props}
                          setHeaderColor={setHeaderColor}
                        />
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        )}
      />
    </div>
  );
}

export default App;
