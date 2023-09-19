import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link, useNavigate} from 'react-router-dom';
import {LoginForm} from '../types';
import {loginPageValidationSchema} from '../validations';

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<LoginForm>({resolver: zodResolver(loginPageValidationSchema), defaultValues: {email: '', password: ''}});
    const watchFields = watch();
    const navigate = useNavigate();

    const isDisabled = !watchFields.email || !watchFields.password;

    const onSubmit = async ({email, password}: LoginForm) => {
        // eslint-disable-next-line no-console
        console.log(email, password);

        navigate('/');
    };

    return (
        <div className="p-login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="example@vuka.hr" id="email" {...register('email')} autoFocus />
                {errors.email && <span>{errors.email.message}</span>}

                <input type="password" placeholder="Password" id="password" {...register('password')} />
                {errors.password && <span>{errors.password?.message}</span>}

                <button type="submit" disabled={isDisabled}>
                    Login
                </button>

                <Link to={'/register'}>Don't have an account?</Link>
            </form>
        </div>
    );
};

export default LoginPage;
