import React from 'react';

const TailwindTest = () => {
    return (
        <div className="p-8 space-y-4 bg-gray-900 min-h-[200px] text-white rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Tailwind Custom Colors Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-afcon-red rounded shadow-lg border border-white/20">
                    <p className="font-bold">AFCON Red</p>
                    <p className="text-sm">bg-afcon-red (#801416)</p>
                </div>
                <div className="p-4 bg-afcon-green rounded shadow-lg border border-white/20">
                    <p className="font-bold">AFCON Green</p>
                    <p className="text-sm">bg-afcon-green (#008751)</p>
                </div>
                <div className="p-4 bg-afcon-gold rounded shadow-lg border border-white/20 text-black">
                    <p className="font-bold">AFCON Gold</p>
                    <p className="text-sm">bg-afcon-gold (#fbbf24)</p>
                </div>
            </div>
            <div className="mt-6 p-4 bg-afcon-dark rounded shadow-lg border border-white/20">
                <p className="font-bold">AFCON Dark</p>
                <p className="text-sm">bg-afcon-dark (#620100)</p>
            </div>
        </div>
    );
};

export default TailwindTest;
