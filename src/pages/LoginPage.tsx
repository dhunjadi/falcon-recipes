import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link, useNavigate} from 'react-router-dom';
import {LoginForm} from '../types';
import {loginPageValidationSchema} from '../validations';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {useEffect, useState} from 'react';
import {userlogin} from '../store/thunks/userThunks';
import Button from '../components/Button';
import {BeatLoader} from 'react-spinners';

const LoginPage: React.FC = () => {
    const {isLoading} = useAppSelector((state: RootState) => state.user);
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
        await dispatch(userlogin({email, password})).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }

            setShowLoginError(true);
        });
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

                <Button type="submit" disabled={isDisabled}>
                    {isLoading ? <BeatLoader color="#cedebd" size={10} /> : 'Login'}
                </Button>

                <Link to={'/register'}>Don't have an account?</Link>
            </form>
        </div>
    );
};

export default LoginPage;
