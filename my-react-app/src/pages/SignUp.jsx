import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useSignUp } from '../hooks/useSignUp'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading}  = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(firstName, lastName, email, password)
    }

    return (
        <div>
            {/* Productivity Text Header*/}
            <div className="absolute top-0 left-0 p-4">
                <p className="text-left font-bold text-xl w-10 leading-snug mb-5">PRODUCTIVITY PRO</p>
            </div>

            {/* About Link */}
            <div className="absolute bottom-0 right-0 p-6">
                {/* Needs to link to about page */}
                <Link to="/about" className="text-sm opacity-50">ABOUT</Link>
            </div>

            <form className='signup' onSubmit={handleSubmit}>
            {/* Product Text and Sign Up Box */}
            <div className='flex justify-center items-center h-screen'>
                <div className='mr-20'>
                    {/* "Get More Done" Text */}
                    <div className='mb-5'>
                        <p className='font-bold text-xl word-wrap break-word w-64 leading-snug'>
                            ACCOMPLISH MORE, FASTER BY SETTING REALISTIC GOALS.</p>
                    </div>

                    {/* "Productivity Pro allows" Text */}
                    <div>
                        <p className='text-sm opacity-50 word-wrap break-word w-60 leading-tight'>
                            PRODUCTIVITY PRO ALLOWS YOU TO GET MORE DONE BY LEARNING ABOUT YOUR PRODUCTIVITY HABITS AND IMPROVING THEM.
                        </p>
                    </div>
                </div>
            
                {/* Sign Up Box */}
                <div className='bg-app-lightGray rounded-lg w-1/3 h-3/5'>
                    {/* Welcome Sign */}
                    <h3 className="text-lg top-0 left-0 p-8">WELCOME</h3>

                    <div className='flex justify-center items-center mt-1'>
                        {/* First Name */}
                        <div className=''>
                            <label className="text-sm leading-snug opacity-50">FIRST NAME</label>
                            <div>
                            <input
                                type="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                className="rounded bg-app-mediumGray px-3 py-2 outline-none w-40"
                            />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className='ml-14'>
                            <label className="text-sm leading-snug opacity-50">LAST NAME</label>
                            <div>
                            <input
                                type="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                className="rounded bg-app-mediumGray px-3 py-2 outline-none w-40"
                            />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='mt-6 ml-16 mr-16'>
                            <label className="text-sm leading-snug opacity-50">EMAIL</label>
                            <div className="">
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="rounded bg-app-mediumGray px-3 py-2 w-full outline-none"
                                />
                            </div>
                    </div>

                    {/* Password */}
                    <div className='mt-6 ml-16 mr-16'>
                            <label className="text-sm leading-snug opacity-50">PASSWORD</label>
                            <div className="">
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="rounded bg-app-mediumGray px-3 py-2 outline-none w-full"
                                />
                            </div>
                    </div>

                    {/* Log In Link */}
                    <div className="mt-4 flex justify-center items-center">
                        <label className = "text-sm opacity-50">Already Have an Account?</label>
                        &nbsp;
                        {/* can change formatting to be better*/}
                        <Link to="/login" className="text-sm">LOG IN</Link>
                    </div>

                    <div className="mt-8 w-full flex justify-center items-center">
                        <button className="rounded bg-app-mediumGreen text-white px-32 py-6" disabled={isLoading}>SIGN UP</button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>

            </div>

            

            {/*}
            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />  

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            */}
        </form>
        </div>
        
    )
}

export default SignUp