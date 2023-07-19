"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";

const HomeSearch = () => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [randomSearchLoading, setRandomSearchLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input.trim()) return;
        router.push(`/search/web?searchTerm=${input}`);
    }
    const randomSearch = async () => {
        setRandomSearchLoading(true);
        const res = await fetch("https://random-word-api.herokuapp.com/word");
        const data =await res.json();
        if(!data) return;
        router.push(`/search/web?searchTerm=${data}`);
        setRandomSearchLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200
            px-5 py-3 rounded-full hover:shadow-md transition-shadow focus-within:shadow-md
            sm:max-w-xl lg:max-w-2xl'>
                <AiOutlineSearch className='text-xl text-gray-500 mr-3' />
                <input
                 onChange={(e) => setInput(e.target.value)} 
                 value={input}
                type="text" 
                className='flex-grow focus:outline-none' />
                <BsFillMicFill className='text-lg' />
            </form>

            <div className='flex flex-col space-y-2 sm:space-y-0 sm:space-x-4
            justify-center items-center sm:flex-row mt-8'>
                <button 
                onClick={handleSubmit}
                className='btn'
                >Google Search</button>
                <button 
                onClick={randomSearch}
                className='btn flex items-center justify-center disabled:opacity-80'
                disabled={randomSearchLoading}
                >
                    {
                    randomSearchLoading ? (
                        <img src="spinner.svg" alt="loading..." 
                        className='h-6 text-center' />
                    ): (
                        "I'm Felling Lucky"
                    )} 
                 
                    </button>
            </div>
        </div>
    );
};

export default HomeSearch;