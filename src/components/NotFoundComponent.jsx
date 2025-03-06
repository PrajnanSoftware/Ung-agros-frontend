import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
export default function NotFoundComponent()
{
    return (
        <div className="flex items-center justify-center h-[calc(100vh-60px)] bg-white-500">
          <div className="text-center text-black">
            <FaExclamationTriangle size={100} className="mx-auto mb-4" />
            <h1 className="text-4xl font-bold">Not Found</h1>
          </div>
        </div>
      );
}