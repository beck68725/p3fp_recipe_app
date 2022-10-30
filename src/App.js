import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import "./App.css";
import Recipe from './components/Recipe';
import Alert from './components/Alert';

const App = () => {
    const[query, setQuery] = useState("");
    const[recipes, setRecipes] = useState([])
    const[alert, setAlert] = useState("");

    const APP_ID = "4af60fe4";

    const APP_KEY = "87c7a2458a1325311efc7553dc370228";

    const url = `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${APP_ID}&app_key=${APP_KEY}&type=public`;


    const getData = async () => {
        if(query !== "") {
            const result = await Axios.get(url);
            if(!result.data.more){
                return setAlert("No food with such name");
            }
        setRecipes(result.data.hits);
        console.log(result);
        setAlert("");
        setQuery("");
        } else {
            setAlert('Please fill the form');
        }
    };

    const onChange = e => {
        setQuery(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    };

  return (
    <div className='App'>
      <h1>Becky's Recipe App</h1>
      <form className='search-form' onSubmit={onSubmit}>
          {alert !==""&& <Alert alert={alert} />}
          <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
          <input type="submit" value="search"/>
      </form>  
      <div className="recipes">
                {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div> 
    </div>
  );
};

export default App;
