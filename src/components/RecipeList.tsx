import {Recipe} from '../types';
import RecipeCard from './RecipeCard';

type RecipeListProps = {
    recipeList: Recipe[];
};
const RecipeList = ({recipeList}: RecipeListProps) => {
    return (
        <div className="c-recipeList">
            {recipeList.map((recipe) => {
                return <RecipeCard key={recipe.id} {...recipe} />;
            })}
        </div>
    );
};

export default RecipeList;
