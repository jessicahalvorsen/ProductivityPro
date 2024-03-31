import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                <div className="bg-app-lightGray rounded-lg p-8 w-96 h-96 flex justify-center items-center">
                    <form className='login' onSubmit={handleSubmit}>
                        {/* Welcome Sign */}
                        <h3 className="text-lg absolute top-0 left-0 p-8">WELCOME</h3>
    
                        {/* Email */}
                        <div className="mt-16">
                            <label className="text-sm leading-snug py-1.5 px-3 mx-1 opacity-50 ml-6">EMAIL</label>
                            <div className="flex justify-center items-center">
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="rounded bg-app-mediumGray px-3 py-2 outline-none"
                                />
                            </div>
                        </div>
                        
                        {/* Password */}
                        <div className='mt-4'>
                            <label className="text-sm leading-snug py-1.5 px-3 mx-1 opacity-50 ml-6">PASSWORD</label>
                            <div className="flex justify-center items-center">
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="rounded bg-app-mediumGray px-3 py-2 outline-none"
                                />
                            </div>
                        </div>

                        {/* Sign-Up Link */}
                        <div className="mt-4 flex justify-center items-center">
                            <label className = "text-sm opacity-50">New User?</label>
                            &nbsp;
                            {/* can change formatting to be better*/}
                            <Link to="/signup" className="text-sm">SIGN UP</Link>
                        </div>

                        {/* Log-In Button */}
                        <div className="mt-6 w-full flex justify-center items-center">
                            <button className="rounded bg-app-mediumGreen text-white px-32 py-6" disabled={isLoading}>LOG IN</button>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
    
            {/* Productivity Pro Header Text */}
            <div className="absolute top-0 left-0 p-4">
                <p className="text-left font-bold text-xl w-10 leading-snug mb-5">PRODUCTIVITY PRO</p>
            </div>

            {/* About Link */}
            <div className="absolute bottom-0 right-0 p-6">
                {/* Needs to link to about page */}
                <Link to="/about" className="text-sm opacity-50">ABOUT</Link>
            </div>
        </div>
    );
    
}

export default Login