import {ChangeEvent, useEffect, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getRecipes} from '../store/thunks/recipeThunks';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';
import {userLogout} from '../store/features/userSlice';
import Pagination from '../components/Pagination';
import RecipeList from '../components/RecipeList';

const HomePage = () => {
    const {recipeList} = useAppSelector((state: RootState) => state.recipe);
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState<string>('');
    const [showOnlyUsersRecipes, setShowOnlyUsersRecipes] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recipesPerPage = 6;

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch, recipeList.length]);
    const usersRecipes = recipeList.filter((recipe) => recipe.authorId === loggedInUser.id);

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = showOnlyUsersRecipes
        ? usersRecipes.slice(firstRecipeIndex, lastRecipeIndex)
        : recipeList.slice(firstRecipeIndex, lastRecipeIndex);

    const filteredList = currentRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()));

    const handlePageSelect = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="p-home">
            <div className="p-home__search">
                <input
                    type="search"
                    value={searchText}
                    placeholder="Search by title"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
            </div>

            <div className="p-home__buttons">
                <Button onClick={() => dispatch(userLogout())}>Logout</Button>
                <Button onClick={() => navigate('/new')}>Add a new Recipe</Button>
            </div>

            <div className="p-home__filters">
                <div className="p-home__filters_tags">Filter by tags:</div>

                <div className="p-home__filters_userRecipes">
                    <label htmlFor="userRecipes">Display only my recipes</label>
                    <input
                        type="checkbox"
                        id="userRecipes"
                        checked={showOnlyUsersRecipes}
                        onChange={() => setShowOnlyUsersRecipes(!showOnlyUsersRecipes)}
                    />
                </div>
            </div>

            <RecipeList recipeList={showOnlyUsersRecipes ? usersRecipes : filteredList} />

            <Pagination
                showPerPage={recipesPerPage}
                total={showOnlyUsersRecipes ? usersRecipes.length : recipeList.length}
                onPageSelect={handlePageSelect}
            />
        </div>
    );
};

export default HomePage;
