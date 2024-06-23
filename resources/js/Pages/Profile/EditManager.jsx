import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import ProfileLayout from '@/Layouts/ProfileLayout';
import Table from '@/Components/Table';

export default function Edit({ auth, mustVerifyEmail, status, tableList = false }) {
    return (
        <ProfileLayout>
            <Head title="Profile" />

            <div className="profile-container">
                <div className="task_list-container">
                    <h2 className='title'>Мои проекты</h2>
                    <div className="task-container">
                        {tableList ? tableList.map((item) => (
                            <Table type={'home'} role={2}  itemProp={item} />
                        )): 
                        <p className='text'>Проекты отсутствуют</p>}
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
