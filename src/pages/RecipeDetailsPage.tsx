import {useNavigate, useParams} from 'react-router-dom';
import {useAppSelector, RootState, useAppDispatch} from '../store/store';
import PlateIcon from '../assets/PlateIcon.svg';
import {deleteRecipe, getRecipe} from '../store/thunks/recipeThunks';
import Button from '../components/Button';
import {useEffect, useState} from 'react';
import {clearSelectedRecipe} from '../store/features/recipeSlice';
import {BeatLoader} from 'react-spinners';
import Modal from '../components/Modal';

const RecipeDetailsPage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const {selectedRecipe, isLoading} = useAppSelector((state: RootState) => state.recipe);
    const {id} = useParams();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        id && dispatch(getRecipe(id));
    }, [dispatch, id]);

    const userIsOwner = selectedRecipe?.authorId === loggedInUser.id;

    const handleDelete = () => {
        dispatch(deleteRecipe(selectedRecipe.id));
        navigate(-1);
    };

    return (
        <>
            <div className="p-recipeDetails">
                <div className="p-recipeDetails__meal">
                    {isLoading ? (
                        <BeatLoader color="#435334" size={10} />
                    ) : (
                        <>
                            <h1>{selectedRecipe.title}</h1>
                            <img className="p-recipeDetails__meal_img" src={PlateIcon} alt="plate and cutlery" />
                        </>
                    )}
                </div>

                <div className="p-recipeDetails__info">
                    {isLoading ? (
                        <BeatLoader color="#435334" size={10} />
                    ) : (
                        <>
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
                                        <Button onClick={() => setIsModalOpen(true)}>Delete</Button>
                                    </>
                                )}
                                <Button
                                    onClick={() => {
                                        navigate('/');
                                        dispatch(clearSelectedRecipe());
                                    }}
                                >
                                    Go back
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                header={`Delete ${selectedRecipe.title}?`}
                showConfirm
                showCancel
                confirmText="Confirm"
                cancelText="Cancel"
            >
                Are u sure you want to delete {selectedRecipe.title}?
            </Modal>
        </>
    );
};

export default RecipeDetailsPage;
