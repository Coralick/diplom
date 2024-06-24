import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLayout from '@/Components/InputLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [eye, setEye] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });


    const changeEyes = (e) => {
        if (eye) {
            setEye(prev => !prev)
            e.target.className = "eye_form close"
        }
        else {
            setEye(prev => !prev)
            e.target.className = "eye_form"
        }
    }

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Вход" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form className='form' onSubmit={submit}>
                <p className="title">Вход</p>

                <div>
                    {/* <InputLabel htmlFor="email" value="Email" /> */}
                    <InputLayout className='email'>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`input ${errors.email && 'error'}`}
                            autoComplete="username"
                            isFocused={true}
                            placeholder='Почта'
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </InputLayout>

                </div>

                <div>
                    {/* <InputLabel htmlFor="password" value="Password" /> */}

                    <InputLayout className='password'>
                        <TextInput
                            id="password"
                            type={eye ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className={`input ${errors.password && 'error'}`}
                            placeholder="Пароль"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <div className="eye_form close" onClick={changeEyes}></div>
                        <InputError message={errors.password} className="error_msg" />
                    </InputLayout>
                </div>

                {/* <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div> */}

                {/* <div className="flex items-center justify-end mt-4"> */}
                {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                <div className='form_bottom'>

                    <PrimaryButton disabled={processing}>
                        Войти
                    </PrimaryButton>
                    <Link href={route('register')} className="link" >Регистрация</Link>
                    {/* <Link className="reset_password" >Восстановление пароля</Link> */}
                </div>
                {/* </div> */}
            </form>
        </GuestLayout>
    );
}
