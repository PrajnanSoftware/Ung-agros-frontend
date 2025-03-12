import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";

const PaymentSuccessPage = () => {
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
        <TiTick className='text-green-600  text-4xl mb-2'/>
        <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
        <p className="mt-2">Redirecting to Home in {countdown} seconds...</p>
    </div>
  )
}

export default PaymentSuccessPage