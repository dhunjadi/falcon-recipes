import {useNavigate} from 'react-router-dom';
import PlateIcon from '../assets/PlateIcon.svg';
import {Recipe} from '../types';
const RecipeCard = ({id, title}: Pick<Recipe, 'id' | 'title'>) => {
    const navigate = useNavigate();

    return (
        <div className="c-recipeCard" onClick={() => navigate(`${id}`)}>
            <img className="c-recipeCard__img" src={PlateIcon} alt="plate and cutlery" />

            <h2 className="c-recipeCard__title">{title}</h2>
        </div>
    );
};

export default RecipeCard;
