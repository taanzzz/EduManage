import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-base-100">
            
            <span className="loading loading-infinity loading-lg text-primary"></span>
            
            
            <p className="mt-4 text-lg font-semibold text-base-content/80 animate-pulse">
                Loading...
            </p>
        </div>
    );
};

export default LoadingSpinner;