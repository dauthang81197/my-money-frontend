'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Mail, Lock} from 'lucide-react';
import {IUserLogin, useAuthLogin} from '../../../hooks/queries/useAuth';

export default function LoginPage() {
    const t = useTranslations();
    const [email, setEmail] = useState('dauthang811@gmail.com');
    const [password, setPassword] = useState('Admin@123');
    const router = useRouter();
    const {mutate: login} = useAuthLogin();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        login(
            {email, password, rememberMe: true},
            {
                onSuccess: (data: { accessToken: string; user: IUserLogin }) => {
                    localStorage.setItem('access_token', data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(data?.user));
                    router.push('/vi/dashboard');
                },
                onError() {
                    alert('Sai tài khoản hoặc mật khẩu!');
                },
            }
        );
    }

    return (
        <div
            className="bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 min-h-screen flex h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="p-8 rounded-xl shadow-md  w-[400px]"
            >
                <div className="relative mb-4">
                    <Mail
                        className="absolute left-3 top-2.5 text-neutral-400"
                        size={20}
                    />
                    <input
                        type="email"
                        placeholder={t('login.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <div className="relative mb-6">
                    <Lock
                        className="absolute left-3 top-2.5 text-neutral-400"
                        size={20}
                    />
                    <input
                        type="password"
                        placeholder={t('login.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 rounded-md bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-bg-neutral-600 py-2 rounded-sm hover:bg-blue-700 font-bold"
                >
                    {t('login.login')}
                </button>
            </form>
        </div>
    );
}
