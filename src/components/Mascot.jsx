import React from 'react';

const Mascot = () => {
    return (
        <div className="fixed bottom-1 right-2 w-[220px] z-[9999] pointer-events-none 
            max-md:w-[70px] max-md:bottom-0 max-md:right-0 max-md:m-0">
            <img
                src="/assets/images/c.webp"
                alt="Mascot"
                className="w-full h-auto block drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] max-md:m-0"
                onError={(e) => e.target.style.display = 'none'}
            />
        </div>
    );
};

export default Mascot;
