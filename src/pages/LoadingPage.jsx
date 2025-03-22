import React from 'react'
import { motion } from "framer-motion";
import { useSelector } from "react-redux"

const LoadingPage = ({children}) => {
    const user = useSelector((state) => state.auth.user);
    
    if (user) return children; 
    
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
            </motion.div>
        </div>
    );
}

export default LoadingPage