import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing"
import Detail from './components/Details/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch> 
          <Route exact path= '/' component= {Landing}/> 
          <Route path= '/home' component= {Home}/> 
          <Route path= '/recipes/:id' component= {Detail}/>
          {/* <Route path= '/Recipe' component= {RecipeCreate}/>  */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
