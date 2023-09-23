import {ChangeEvent, useEffect, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getRecipes} from '../store/thunks/recipeThunks';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';
import {userLogout} from '../store/features/userSlice';
import Pagination from '../components/Pagination';
import RecipeList from '../components/RecipeList';
import TagFilter from '../components/TagFilter';
import {Recipe} from '../types';
import BeatLoader from 'react-spinners/BeatLoader';

const HomePage = () => {
    const {recipeList, isLoading} = useAppSelector((state: RootState) => state.recipe);
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState<string>('');
    const [showOnlyUsersRecipes, setShowOnlyUsersRecipes] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [recipesPerPage, setRecipesPerPage] = useState<number>(6);

    const tags = recipeList.flatMap((recipe) => recipe.tags);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch, recipeList.length]);

    const usersRecipes = recipeList.filter((recipe) => recipe.authorId === loggedInUser.id);

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = (showOnlyUsersRecipes ? usersRecipes : recipeList).slice(firstRecipeIndex, lastRecipeIndex);

    const filteredList = currentRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()));

    const recipeListFilteredByTags = recipeList.filter((recipe) => {
        return selectedTags.some((selectedTag) => recipe.tags.includes(selectedTag));
    });

    const handleTagChange = (newSelectedTags: string[]) => {
        setSelectedTags(newSelectedTags);
    };

    const handlePageSelect = (pageNumber: number) => setCurrentPage(pageNumber);

    const getRecipeList = (): Recipe[] => {
        if (selectedTags.length > 0) return recipeListFilteredByTags;
        if (showOnlyUsersRecipes) return usersRecipes;
        return filteredList;
    };

    const getTotalPages = (): number => {
        if (selectedTags.length > 0) return recipeListFilteredByTags.length;
        if (showOnlyUsersRecipes) return usersRecipes.length;
        return recipeList.length;
    };

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
                <div className="p-home__filters_userRecipes">
                    <label htmlFor="userRecipes">Show my recipes</label>
                    <input
                        type="checkbox"
                        id="userRecipes"
                        checked={showOnlyUsersRecipes}
                        onChange={() => {
                            setSelectedTags([]);
                            setShowOnlyUsersRecipes(!showOnlyUsersRecipes);
                        }}
                    />
                </div>

                <div className="p-home__filters_tags">
                    <TagFilter tags={tags} selectedTags={selectedTags} onTagChange={handleTagChange} />
                </div>

                <div className="p-home__filters_showPerPage">
                    <label htmlFor="showPerPage">Show per page: </label>
                    <select
                        name="showPerPage"
                        id="showPerpage"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setRecipesPerPage(+e.target.value)}
                    >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <BeatLoader color="#435334" size={10} />
            ) : (
                <>
                    <RecipeList recipeList={getRecipeList()} />

                    <Pagination
                        showPerPage={recipesPerPage}
                        total={getTotalPages()}
                        onPageSelect={handlePageSelect}
                        activePage={currentPage}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
