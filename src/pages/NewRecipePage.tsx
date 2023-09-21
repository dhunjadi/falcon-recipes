import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {NewRecipe} from '../types';
import {newRecipeValidationSchema} from '../validations';
import {RootState, useAppSelector} from '../store/store';
import {getCurrentDate} from '../utilities';

const NewRecipePage = () => {
    const {loggedInUser} = useAppSelector((state: RootState) => state.user);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewRecipe>({
        resolver: zodResolver(newRecipeValidationSchema),
        defaultValues: {title: '', dateCreated: getCurrentDate(), authorId: loggedInUser.id, instructions: [], tags: []},
    });

    const onSubmit = (data: NewRecipe) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };

    return (
        <div className="p-newRecipe">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Recipe title" {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}

                <input type="text" placeholder="Instructions, separated by newlines" {...register('instructions')} />
                {errors.instructions && <span>{errors.instructions.message}</span>}

                <input type="text" placeholder="Tags, separated by commas" {...register('tags')} />
                {errors.tags && <span>{errors.tags.message}</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewRecipePage;
