import {useNavigate, useParams} from 'react-router-dom';
import {useAppSelector, RootState, useAppDispatch} from '../store/store';
import PlateIcon from '../assets/PlateIcon.svg';
import {deleteRecipe, getRecipe} from '../store/thunks/recipeThunks';
import Button from '../components/Button';
import {useEffect} from 'react';
import {clearSelectedRecipe} from '../store/features/recipeSlice';

const RecipeDetailsPage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const {selectedRecipe} = useAppSelector((state: RootState) => state.recipe);
    const {id} = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        id && dispatch(getRecipe(id));
    }, [dispatch, id, selectedRecipe]);

    const userIsOwner = selectedRecipe?.authorId === loggedInUser.id;

    const handleDelete = () => {
        dispatch(deleteRecipe(selectedRecipe.id));
        navigate(-1);
    };

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

                <div className="p-recipeDetails__info_buttons">
                    {userIsOwner && (
                        <>
                            <Button onClick={() => navigate(`/edit/${selectedRecipe.id}`)}>Edit</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </>
                    )}
                    <Button
                        onClick={() => {
                            navigate(-1);
                            dispatch(clearSelectedRecipe());
                        }}
                    >
                        Go back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
