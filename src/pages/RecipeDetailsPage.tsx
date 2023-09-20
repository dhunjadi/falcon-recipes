import {useParams} from 'react-router-dom';
import {useAppSelector, RootState} from '../store/store';
import PlateIcon from '../assets/PlateIcon.svg';
import {Recipe} from '../types';

const RecipeDetailsPage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const {recipeList} = useAppSelector((state: RootState) => state.recipe);
    const {id} = useParams();
    const selectedRecipe: Recipe | undefined = recipeList.find((recipe) => recipe.id === id);
    const userIsOwner = selectedRecipe?.authorId === loggedInUser.id;

    if (!selectedRecipe) return <></>;

    return (
        <div className="p-recipeDetails">
            <div className="p-recipeDetails__meal">
                <h1>{selectedRecipe.title}</h1>
                <img className="p-recipeDetails__meal_img" src={PlateIcon} alt="plate and cutlery" />
            </div>

            <div className="p-recipeDetails__info">
                <div className="p-recipeDetails__info_instructions">
                    <strong>Instructions:</strong>
                    <ol>
                        {selectedRecipe.instructions.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div className="p-recipeDetails__info_tags">
                    <strong>Tags:</strong>
                    <ul>
                        {selectedRecipe.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </div>

                {userIsOwner && (
                    <div className="p-recipeDetails__info_buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
