import React, {useState} from 'react';
import Axios from 'axios';
import "./App.css";
import Recipe from './components/Recipe';

const App = () => {
    const[query, setQuery] = useState("");
    const[recipes, setRecipes] = useState([])

    const APP_ID = "4af60fe4";

    const APP_KEY = "87c7a2458a1325311efc7553dc370228";

    const url = `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${APP_ID}&app_key=${APP_KEY}&type=public`;


    const getData = async () => {
        const result = await Axios.get(url);
        setRecipes(result.data.hits)
        console.log(result);
        setQuery("");
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
      <h1>Food Searching App</h1>
      <form className='search-form' onSubmit={onSubmit}>
          <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
          <input type="submit" value="search"/>
      </form>  
      <div className="recipes">
                {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} />)}
      </div> 
    </div>
  );
};

export default App;
