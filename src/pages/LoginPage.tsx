import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link, useNavigate} from 'react-router-dom';
import {LoginForm} from '../types';
import {loginPageValidationSchema} from '../validations';
import {userList} from '../data/userList';
import {useAppDispatch} from '../store/store';
import {setLoggedInUser} from '../store/features/userSlice';
import {useEffect, useState} from 'react';

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<LoginForm>({resolver: zodResolver(loginPageValidationSchema), defaultValues: {email: '', password: ''}});
    const watchFields = watch();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showLoginError, setShowLoginError] = useState<boolean>(false);

    const isDisabled = !watchFields.email || !watchFields.password;

    const onSubmit = async ({email, password}: LoginForm) => {
        const foundUser = userList.find((user) => user.email === email && user.password === password);
        if (foundUser) {
            dispatch(setLoggedInUser(foundUser));
            navigate('/');
        }
        setShowLoginError(true);
    };

    useEffect(() => {
        setShowLoginError(false);
    }, [watchFields.email, watchFields.password]);

    return (
        <div className="p-login">
            <form className="p-login__form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="example@example.hr" id="email" {...register('email')} autoFocus />
                {errors.email && <span>{errors.email.message}</span>}

                <input type="password" placeholder="Password" id="password" {...register('password')} />
                {errors.password && <span>{errors.password?.message}</span>}

                {showLoginError && <span>Wrong username or password!</span>}

                <button className={`p-login__form_button ${isDisabled && 'isDisabled'}`} type="submit" disabled={isDisabled}>
                    Login
                </button>

                <Link to={'/register'}>Don't have an account?</Link>
            </form>
        </div>
    );
};

export default LoginPage;
