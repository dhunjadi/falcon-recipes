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
        control, // Pass the control prop
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
        <div className="p-newRecipe">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Recipe title" {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}

                {instructionFields.map((field, index) => (
                    <div key={field.id}>
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
                <button type="button" onClick={() => appendInstruction({instruction: ''})}>
                    Add Instruction
                </button>

                {tagFields.map((field, index) => (
                    <div key={field.id}>
                        <input type="text" placeholder={`Tag #${index + 1}`} {...register(`tags.${index}.tag` as const)} />
                        <button type="button" onClick={() => removeTag(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => appendTag({tag: ''})}>
                    Add Tag
                </button>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewRecipePage;
