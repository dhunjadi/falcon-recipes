import {zodResolver} from '@hookform/resolvers/zod';
import {useFieldArray, useForm} from 'react-hook-form';
import {NewRecipe, NewRecipeForm} from '../types';
import {newRecipeValidationSchema} from '../validations';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getCurrentDate} from '../utilities';
import {addRecipe, updateRecipe} from '../store/thunks/recipeThunks';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Button from '../components/Button';

const NewRecipePage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const {recipeList} = useAppSelector((state: RootState) => state.recipe);
    const {id} = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const isEditing = pathname.includes('edit');
    const recipeBeingEdited = recipeList.find((recipe) => recipe.id === id);

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<NewRecipeForm>({
        resolver: zodResolver(newRecipeValidationSchema),
        defaultValues: {
            title: recipeBeingEdited?.title || '',
            dateCreated: recipeBeingEdited?.dateCreated || getCurrentDate(),
            authorId: recipeBeingEdited?.authorId || loggedInUser.id,
            instructions: (recipeBeingEdited?.instructions || ['']).map((instruction) => ({instruction})) || [{instruction: ''}],
            tags: (recipeBeingEdited?.tags || ['']).map((tag) => ({tag})) || [{tag: ''}],
        },
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control,
        name: 'instructions',
    });

    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({
        control,
        name: 'tags',
    });

    const onSubmit = async (data: NewRecipeForm) => {
        const newRecipeData: NewRecipe = {
            title: data.title,
            dateCreated: data.dateCreated,
            authorId: data.authorId,
            instructions: data.instructions.map((item) => item.instruction),
            tags: data.tags.map((item) => item.tag),
        };

        if (recipeBeingEdited && isEditing) {
            dispatch(updateRecipe({recipeId: recipeBeingEdited.id, recipe: newRecipeData}));
            navigate(-1);
        } else {
            dispatch(addRecipe(newRecipeData));
            navigate(-1);
        }
    };

    return (
        <form className="p-newRecipe" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-newRecipe__title">
                <input type="text" placeholder="Recipe title" {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="p-newRecipe__instructions">
                {instructionFields.map((field, index) => (
                    <div className="p-newRecipe__instructions_instruction" key={field.id}>
                        <input
                            type="text"
                            placeholder={`Instruction #${index + 1}`}
                            {...register(`instructions.${index}.instruction` as const)}
                        />

                        <Button type="button" onClick={() => removeInstruction(index)}>
                            Remove
                        </Button>
                    </div>
                ))}

                <div className="p-newRecipe__instructions_addButton">
                    <Button type="button" onClick={() => appendInstruction({instruction: ''})}>
                        Add Instruction
                    </Button>
                </div>
            </div>

            <div className="p-newRecipe__tags">
                {tagFields.map((field, index) => (
                    <div className="p-newRecipe__tags_tag" key={field.id}>
                        <input type="text" placeholder={`Tag #${index + 1}`} {...register(`tags.${index}.tag` as const)} />
                        <Button type="button" onClick={() => removeTag(index)}>
                            Remove
                        </Button>
                    </div>
                ))}

                <div className="p-newRecipe__tags_addButton">
                    <Button type="button" onClick={() => appendTag({tag: ''})}>
                        Add Tag
                    </Button>
                </div>
            </div>

            <div className="p-newRecipe__submitButton">
                <Button type="submit">{isEditing ? 'Update' : 'Submit'}</Button>
            </div>
        </form>
    );
};

export default NewRecipePage;
