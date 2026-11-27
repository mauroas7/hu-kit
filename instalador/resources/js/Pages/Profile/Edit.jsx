import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout titulo="Mi cuenta" subtitulo="Tus datos y tu contraseña">
            <Head title="Mi cuenta" />

            <div className="max-w-3xl space-y-6">
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                <UpdatePasswordForm />
                <DeleteUserForm />
            </div>
        </AppLayout>
    );
}
