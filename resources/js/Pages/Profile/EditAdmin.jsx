import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, router } from '@inertiajs/react';
import ProfileLayout from '@/Layouts/ProfileLayout';
import { useState } from 'react';

export default function EditAdmin({ auth, mustVerifyEmail, status, personal, roleList  }) {
    const [data, setData] = useState('')

    const updateData = e => {
        setData(e.target.dataset.id)
    }
    const updateRole = e => {
        router.post(route('user.edit-role'), { user_id: data, role_id: e.target.value })
        e.target.value=0
    }
    console.log()

    return (
        <ProfileLayout>
            <Head title="Профиль" />

            <div className="profile-container">
                <div className="task_list-container">
                    <h2 className='title'>Сотрудники</h2>
                    <div className="personal-container">
                        {personal && personal.map(item => (
                            <div className={`task_row ${item.role.id == 1 ? 'admin' : (item.role.id == 2 ? 'manager' : 'worker')}`}>
                                <div><p className="name">{item.name}</p></div>
                                <div><p className="role">{item.role.name}</p></div>
                                <select name="role_id" data-id={item.id} onClick={updateData} onChange={updateRole}>
                                    <option value={0} selected disabled>Выберите роль</option>
                                    {roleList && roleList.map(role => (
                                        <option value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
