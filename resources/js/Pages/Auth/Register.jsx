import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLayout from '@/Components/InputLayout';

import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [eye, setEye] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)

    const changeEyes = (e) => {
        if (e.target.parentElement.querySelector('input').name === "password") {
            if (eye) {
                setEye(prev => !prev)
                e.target.className = "eye_form close"
            }
            else {
                setEye(prev => !prev)
                e.target.className = "eye_form";
            }
        }
        else {
            if (eyeRepeat) {
                setEyeRepeat(prev => !prev)
                e.target.className = "eye_form close"
            }
            else {
                setEyeRepeat(prev => !prev)
                e.target.className = "eye_form";
            }
        }
    }

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Регистрация" />
            <div className="back_btn">
                <Link href={route('login')} className="link" >Вход</Link>
            </div>
            <form className='form' onSubmit={submit}>
                <p className="title">Регистрация</p>

                <div>
                    <InputLayout className='name'>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className={`input`}
                            autoComplete="name"
                            isFocused={true}
                            placeholder='Имя'
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </InputLayout>

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div >

                    <InputLayout className='email'>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`input ${errors.password && 'error'}`}
                            autoComplete="username"
                            placeholder='Электронная почта'
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </InputLayout>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLayout className='password'>
                        <TextInput
                            id="password"
                            type={eye ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className={`input ${errors.password && 'error'}`}
                            autoComplete="new-password"
                            placeholder='Пароль'
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <div className="eye_form close" onClick={changeEyes}></div>
                    </InputLayout>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div >

                    <InputLayout className='password'>
                        <TextInput
                            id="password_confirmation"
                            type={eyeRepeat ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className={`input ${errors.password && 'error'}`}
                            autoComplete="new-password"
                            placeholder='Повтор пароля'
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <div className="eye_form close" onClick={changeEyes}></div>
                    </InputLayout>

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <PrimaryButton disabled={processing}>
                    Регистрация
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
