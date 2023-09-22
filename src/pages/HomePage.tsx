import {ChangeEvent, useEffect, useState} from 'react';
import RecipeCard from '../components/RecipeCard';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getRecipes} from '../store/thunks/recipeThunks';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';

const HomePage = () => {
    const {recipeList} = useAppSelector((state: RootState) => state.recipe);
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    const [searchText, setSearchText] = useState<string>('');
    const [showOnlyUsersRecipes, setShowOnlyUsersRecipes] = useState<boolean>(false);

    const filteredList = recipeList.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()));
    const usersRecipes = filteredList.filter((recipe) => recipe.authorId === loggedInUser.id);

    return (
        <div className="p-home">
            <div className="p-home__search">
                <input type="search" value={searchText} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
            </div>

            <div className="p-home__options">
                <div className="p-home__options_filters">
                    Filter by tags:
                    <label htmlFor="userRecipes">Display only my recipes</label>
                    <input
                        type="checkbox"
                        id="userRecipes"
                        checked={showOnlyUsersRecipes}
                        onChange={() => setShowOnlyUsersRecipes(!showOnlyUsersRecipes)}
                    />
                </div>

                <div className="p-home__options_buttons">
                    <Button onClick={() => navigate('/new')}>Add a new Recipe</Button>
                </div>
            </div>

            <div className="p-home__recipes">
                {showOnlyUsersRecipes
                    ? usersRecipes.map((recipe) => {
                          return <RecipeCard key={recipe.id} {...recipe} />;
                      })
                    : filteredList.map((recipe) => {
                          return <RecipeCard key={recipe.id} {...recipe} />;
                      })}
            </div>
        </div>
    );
};

export default HomePage;
