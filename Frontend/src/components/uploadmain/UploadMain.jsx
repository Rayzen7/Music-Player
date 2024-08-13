import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Ring from '/image/ring.png';

const Upload = () => {
    const [musics, setMusics] = useState([]);
    const [playing, setPlaying] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await axios.get('https://music-player-api-liart.vercel.app/api/music');
                setMusics(response.data);
            } catch (error) {
                console.error('Error fetching music:', error);
            }
        };

        fetchMusics();
    }, []);

    const handlePlay = (id) => {
        setPlaying(id);
    };

    const handlePause = () => {
        setPlaying(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setUploadMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('artist', artist);

        try {
            const response = await axios.post("https://music-player-api-liart.vercel.app/api/music/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadMessage(response.data.message || 'Upload successful!');
            setTitle('');
            setArtist('');
            setFile(null);
        } catch (error) {
            console.error("Error Uploading File", error);
            setUploadMessage('Error Uploading File. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://music-player-api-liart.vercel.app/api/music/${id}`);
            setMusics(musics.filter(music => music._id !== id));
        } catch (error) {
            console.error('Error deleting music:', error);
        }
    };

    return (
        <div className='w-full min-h-[100vh] bg-gray-100 p-4'>
            <h1 className='text-center text-blue mt-12 lg:text-[40px] text-[32px] font-poppins'>Upload</h1>
            <div>
                <form 
                    className='flex flex-col justify-center items-center gap-7 mt-6'
                    onSubmit={handleUpload}
                >
                    <input 
                        type="text" 
                        placeholder='Title' 
                        className='lg:w-[700px] w-[300px] h-[60px] rounded-lg text-black outline-blue pl-4'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input 
                        type="text" 
                        placeholder='Artist' 
                        className='lg:w-[700px] w-[300px] h-[60px] rounded-lg text-black outline-blue pl-4'
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />

                    <input 
                        type="file" 
                        className='lg:w-[700px] w-[300px] bg-white text-black rounded-lg'
                        onChange={handleFileChange}
                        required
                    />

                    {file && <p className='text-center mt-2'>Selected File: {file.name}</p>}

                    <button 
                        type='submit' 
                        className='lg:w-[700px] w-[300px] h-[60px] bg-blue text-white duration-300 transition-all hover:bg-white hover:text-blue hover:scale-75 hover:opacity-75 text-[22px] font-poppins rounded-xl'
                    >
                        Upload
                    </button>
                    {uploadMessage && <p className='text-center mt-6'>{uploadMessage}</p>}
                </form>
            </div>
            <div className='text-black mt-12'>
                <h1 className='font-poppins text-black lg:text-[37px] text-[28px] pt-[20px]'>MUSIC PLAYLIST</h1>
                <div className='mt-6 space-y-10 block mx-auto'>
                    {musics.map(music => (
                        <div 
                            key={music._id} 
                            className='bg-white flex lg:flex-row flex-col mx-auto lg:w-[900px] w-[300px] justify-center lg:justify-between items-center px-10 lg:py-5 py-10 rounded-3xl'
                        >
                            <div className='flex lg:flex-row flex-col justify-center items-center'>
                                <img 
                                    src={Ring} 
                                    alt="Album Art" 
                                    className={`h-auto lg:w-[80px] w-[120px] ${playing === music._id ? 'animate-rotate' : ''}`} 
                                />
                                <div className='lg:ml-7 ml-0 lg:mt-0 mt-10 lg:text-start text-center'>
                                    <h2 className='text-[24px] font-poppins'>{music.title}</h2>
                                    <p>{music.artist}</p>
                                </div>
                            </div>
                            <audio 
                                controls 
                                className='lg:w-[400px] w-[250px] lg:scale-[1.2] scale-[1.1] lg:mt-0 mt-8 audio-custom'
                                onPlay={() => handlePlay(music._id)}
                                onPause={handlePause}
                            >
                                <source src={music.fileUrl} type='audio/mp3' />
                            </audio>
                            <button 
                                onClick={() => handleDelete(music._id)}
                                className='p-2 bg-red-500 text-white rounded-lg lg:mt-0 mt-6'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-[120px]'>
                <Link to='/Upload'>
                    <button 
                        className='text-white bg-blue w-[200px] h-[50px] font-poppins text-[19px] rounded-3xl mx-auto block hover:bg-white hover:text-blue hover:scale-75 hover:opacity-90 duration-300'
                    >
                        Refreash
                    </button>
                </Link>
                <Link to='/'>
                    <button 
                        className='text-white bg-blue w-[200px] h-[50px] font-poppins text-[19px] rounded-3xl mx-auto block hover:bg-white mt-10 hover:text-blue hover:scale-75 hover:opacity-90 duration-300'
                    >
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Upload;
