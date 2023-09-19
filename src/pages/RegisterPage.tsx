import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {RegisterForm} from '../types';
import {registerValidationSchema} from '../validations';
import {useAppDispatch} from '../store/store';
import {registerUser} from '../store/thunks/userThunks';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerValidationSchema),
        defaultValues: {name: '', email: '', password: '', confirmPassword: ''},
    });
    const watchFields = watch();

    const isDisabled = !watchFields.name || !watchFields.email || !watchFields.password || !watchFields.confirmPassword;

    const onSubmit = ({name, email, password}: RegisterForm) => {
        dispatch(registerUser({name, email, password}));
        navigate('/login');
    };

    return (
        <div className="p-register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter your name" id="name" {...register('name')} autoFocus />
                {errors.name && <span>{errors.name.message}</span>}

                <input type="text" placeholder="example@vuka.hr" id="email" {...register('email')} />
                {errors.email && <span>{errors.email.message}</span>}

                <input type="password" placeholder="Password" id="password" {...register('password')} />
                {errors.password && <span>{errors.password.message}</span>}

                <input type="password" placeholder="Confirm Password" id="confirmPassword" {...register('confirmPassword')} />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

                <button type="submit" disabled={isDisabled}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
