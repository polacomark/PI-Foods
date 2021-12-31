import './App.css';
//import React, {useEffect} from 'react';
//import { useDispatch } from 'react-redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
//import { getRecipes, getDiets} from './reducer/redux';

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getRecipes());
  //   //dispatch(getDiets());
  // }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch> 
          <Route exact path= '/' component= {Landing}/> 
          <Route path= '/home' component= {Home}/> 
          <Route path= '/home:id' component= {Detail}/>
          <Route path= '/Recipe' component= {CreateRecipe}/> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
