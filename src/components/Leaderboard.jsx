import React from 'react';

const Leaderboard = ({ predictions }) => {
    // Sort logic should pass down pre-sorted or sort here.
    // Assuming passed predictions are raw, let's sort here or in parent.
    // Parent should probably handle sorting to keep this dumb.
    // But let's just map.

    return (
        <section className="mt-12 mb-20 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center text-white/90">Current Leaderboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {predictions.map((p, index) => (
                    <div
                        key={index}
                        className="bg-green-900/80 p-4 rounded-xl border-t-4 border-afcon-gold text-center shadow-xl backdrop-blur-sm transform transition hover:scale-105"
                    >
                        <div className="text-xs font-bold text-afcon-gold uppercase truncate px-2">{p.name}</div>
                        <div className="text-2xl font-black">{p.scoreA} - {p.scoreB}</div>
                        <div className="text-[10px] text-gray-300 mt-1">{p.accuracy}% Match</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Leaderboard;
