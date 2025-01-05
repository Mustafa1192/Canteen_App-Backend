import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessageType('success');
                setMessage(result.message);
                setTimeout(() => {
                    navigate('/Home'); // Redirect to home page after successful login
                }, 2000);
            } else {
                setMessageType('error');
                setMessage(result.message);
            }
        } catch (error) {
            setMessageType('error');
            setMessage('Server error');
        }
    };

    return (
        <div className="w-full h-screen bg-[#FAF5FF] p-5">
            <div className='pt-16'>
                <Link to="/Index">
                    <h1 className='text-center text-3xl font-bold text-[#534E55]'> Hello Again!</h1>
                </Link>
                <p className='text-center text-2xl text-[#808080] mt-4'>Welcome back you’ve been missed!</p>
            </div>

            <div className='flex justify-center items-center'>
                <form className='mt-12 text-center w-full sm:w-96' onSubmit={handleSubmit}>
                    <input 
                        className='p-5 bg-[#FFFFFF] rounded-2xl w-full sm:w-96 drop-shadow-md'
                        placeholder='Enter username'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    /><br />
                    <div className='flex mt-4 w-full sm:w-96 bg-[#FFFFFF] rounded-2xl drop-shadow-md'>
                        <input 
                            className='py-1 pb-5 px-5 w-full sm:w-96 mt-4 bg-[#FFFFFF] my-auto focus:outline-none rounded-2xl border-transparent'
                            placeholder='Password'
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span className="cursor-pointer my-auto px-5 text-[#808080]" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {message && <p className={`text-center mt-4 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                    <a href="/Forget"><p className='text-center text-[#5B5B5E] mt-4'>Recovery Password</p></a>

                    <button className='p-5 mt-8 bg-[#FE724C] rounded-2xl drop-shadow-md w-full sm:w-80' type='submit'>
                        <h1 className='text-center text-white font-medium text-lg'>SIGN IN</h1>
                    </button>
                </form>
            </div>

            <Link to="/Register">
                <h2 className='text-center mt-6'>Not a Member? &nbsp;
                    <span className='text-[#FE724C]'>Register Now</span>
                </h2>
            </Link>
        </div>
    );
}

export default Login;








// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const [formData, setFormData] = useState({ email: '' });
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 setMessageType('success');
//                 setMessage(result.message);

//                 // Redirect to dashboard or homepage
//                 navigate('/home', { state: { username: result.user } });
//             } else {
//                 setMessageType('error');
//                 setMessage(result.message);
//             }
//         } catch (error) {
//             setMessageType('error');
//             setMessage('Server error, please try again later.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Login</h2>

//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {message && (
//                     <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
//                         {message}
//                     </p>
//                 )}

//                 <button type="submit" className="btn-submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
