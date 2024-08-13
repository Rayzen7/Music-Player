import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Background from '/image/wallpaper.jpg';
import Ring from '/image/ring.png';
import './Song.css';
import { Link } from 'react-router-dom';

const SongPlaylist = () => {
    const [musics, setMusics] = useState([]);
    const [playing, setPlaying] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handlePlay = (id, index) => {
        setPlaying(id);
        setCurrentIndex(index);
    };

    const handlePause = () => {
        setPlaying(null);
    };

    const handleEnded = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < musics.length) {
            const nextMusic = musics[nextIndex];
            setPlaying(nextMusic._id);
            setCurrentIndex(nextIndex);
        }
    };

    return (
        <div 
            className='w-full min-h-[100vh] h-auto bg-cover bg-no-repeat object-cover relative text-black'
            style={{ backgroundImage: `url(${Background})` }}
        >
            <div className='flex flex-col w-full items-center justify-center'>
                <h1 className='font-poppins text-white lg:text-[37px] text-[28px] pt-[120px]'>MUSIC PLAYLIST</h1>
                <div className='mt-6 space-y-10'>
                    {musics.map((music, index) => (
                        <div 
                            key={music._id} 
                            className='bg-white flex lg:flex-row flex-col lg:w-[900px] w-[300px] justify-center lg:justify-between items-center px-10 lg:py-5 py-10 rounded-3xl'
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
                                onPlay={() => handlePlay(music._id, index)}
                                onPause={handlePause}
                                onEnded={handleEnded}  
                            >
                                <source src={music.fileUrl} type='audio/mp3' />
                            </audio>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-[90px] pb-[30px]'>
                <Link to='/'>
                    <button 
                        className='text-white bg-blue w-[200px] h-[50px] font-poppins text-[19px] rounded-3xl mx-auto block hover:bg-white hover:text-blue hover:scale-75 hover:opacity-90 duration-300'
                    >
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SongPlaylist;
