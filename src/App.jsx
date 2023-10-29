import {useState} from 'react';
import RecipeListPage from './pages/RecipeListPage';
import RecipePage from './pages/RecipePage';
import { data } from './utils/data';

export const App = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
       
            selectedRecipe ? (
                <RecipePage selectedRecipe={selectedRecipe} onBackClick={() => setSelectedRecipe(null)} />
            ) : (
                <RecipeListPage recipes={data.hits} onSelectRecipe={setSelectedRecipe} />
            )
       
    );
};

