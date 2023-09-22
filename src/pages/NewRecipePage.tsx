import {zodResolver} from '@hookform/resolvers/zod';
import {useFieldArray, useForm} from 'react-hook-form';
import {NewRecipe, NewRecipeForm} from '../types';
import {newRecipeValidationSchema} from '../validations';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {getCurrentDate} from '../utilities';
import {addRecipe} from '../store/thunks/recipeThunks';
import {useNavigate} from 'react-router-dom';

const NewRecipePage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<NewRecipeForm>({
        resolver: zodResolver(newRecipeValidationSchema),
        defaultValues: {
            title: '',
            dateCreated: getCurrentDate(),
            authorId: loggedInUser.id,
            instructions: [{instruction: ''}],
            tags: [{tag: ''}],
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

        dispatch(addRecipe(newRecipeData));
        navigate(-1);
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

                        <button type="button" onClick={() => removeInstruction(index)}>
                            Remove
                        </button>
                    </div>
                ))}

                <div className="p-newRecipe__instructions_addButton">
                    <button type="button" onClick={() => appendInstruction({instruction: ''})}>
                        Add Instruction
                    </button>
                </div>
            </div>

            <div className="p-newRecipe__tags">
                {tagFields.map((field, index) => (
                    <div className="p-newRecipe__tags_tag" key={field.id}>
                        <input type="text" placeholder={`Tag #${index + 1}`} {...register(`tags.${index}.tag` as const)} />
                        <button type="button" onClick={() => removeTag(index)}>
                            Remove
                        </button>
                    </div>
                ))}

                <div className="p-newRecipe__tags_addButton">
                    <button type="button" onClick={() => appendTag({tag: ''})}>
                        Add Tag
                    </button>
                </div>
            </div>

            <div className="p-newRecipe__submitButton">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default NewRecipePage;
