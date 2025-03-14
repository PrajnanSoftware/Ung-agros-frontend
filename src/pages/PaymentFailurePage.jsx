import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";

const PaymentFailurePage = () => {
    const navigate = useNavigate();
    const [ countdown, setCountdown ] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if(prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
    
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
        <ImCross className='text-red-600  text-4xl mb-2'/>
        <h1 className="text-2xl font-bold text-red-600">Order Failed</h1>
        <p className="mt-2">Redirecting to Home in {countdown} seconds... <Link to={'/'} className='underline text-blue-700'>Home</Link> </p>
    </div>
  )
}

export default PaymentFailurePage