import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import background from '/image/wallpaper.jpg';

const LoginMain = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Timer message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://music-player-api-liart.vercel.app/api/admin/Adminlogin', {
                email,
                password
            });

            setMessage(response.data.message); 
            document.querySelector('.message').classList.add('active');

            if(response.status === 200) {
                navigate('/Upload');
            }
        } catch (error) {
            if (error.message) {
                setMessage(error.response.data.message);
            } else if (error.request) {
                setMessage("No response from server");
            } else {
                setMessage("An error occurred");
            }

            document.querySelector('.message').classList.add('active');
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[450px] h-[450px] bg-black bg-opacity-50 rounded-lg lg:scale-100 scale-[85%]">
                <h1 className="text-white text-[35px] mb-4 font-poppins">Admin</h1>
                <p className="text-white text-sm text-center mb-9 text-[15px] w-[300px] font-poppins2">Silahkan memasukkan email dan kata sandi yang benar</p>
                <div className="flex flex-col gap-4 mb-7 text-black">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-[300px] h-[45px] px-3 rounded-md border-none outline-none focus:outline-blue text-[16px]"
                    />
                    <input
                        type="password"
                        placeholder="Kata Sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-[300px] h-[45px] px-3 rounded-md border-none outline-none focus:outline-blue text-[16px]"
                    />
                </div>
                <button type="submit" className="w-[100px] h-[40px] rounded-full bg-blue text-white font-semibold text-sm transition-transform transform hover:scale-95 active:bg-white active:text-blue">
                    Login
                </button>
                <div className={`message fixed top-[-18%] left-1/2 transform -translate-x-1/2 bg-white text-black text-center p-2 rounded-lg w-[350px] py-[10px] transition-opacity duration-500 font-poppins ${message ? 'opacity-100' : 'opacity-0'}`}>
                    {message && <p>{message}</p>}
                </div>
                <p className="text-white mt-4">Bukan admin? <Link to='/'><span className="text-blue-400 underline">Masuk di sini</span></Link></p>
            </form>
        </div>
    );
}

export default LoginMain;
