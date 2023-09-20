import {ChangeEvent, useEffect, useState} from 'react';
import RecipeCard from '../components/RecipeCard';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getRecipes} from '../store/thunks/recipeThunks';

const HomePage = () => {
    const {recipeList} = useAppSelector((state: RootState) => state.recipe);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    const [searchText, setSearchText] = useState<string>('');

    const filteredList = recipeList.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="p-home">
            <div className="p-home__search">
                <input type="search" value={searchText} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
            </div>
            <div className="p-home__recipes">
                {filteredList.map((recipe) => {
                    return <RecipeCard key={recipe.id} {...recipe} />;
                })}
            </div>
        </div>
    );
};

export default HomePage;
