import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="body min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="main">

                <div>
                    <Link className='header_logo' href="/">
                        <ApplicationLogo className="logo_header" />
                    </Link>
                </div>

                {children}
            </div>
        </div>
    );
}
