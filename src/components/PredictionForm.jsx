import React, { useState } from 'react';

const PredictionForm = ({ onAddPrediction, teamA, teamB }) => {
    const [name, setName] = useState('');
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);

    const handleSubmit = () => {
        if (!name.trim()) {
            alert("Please enter your name!"); // Or use a Toast component if available
            return;
        }
        if (scoreA < 0 || scoreB < 0) {
            alert("Negative numbers are not allowed!");
            return;
        }

        onAddPrediction({ name, scoreA: parseInt(scoreA), scoreB: parseInt(scoreB) });
        setName('');
        setScoreA(0);
        setScoreB(0);
    };

    return (
        <section className="bg-afcon-red/30 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-6 text-afcon-gold">Enter Your Pronostic</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded bg-black/50 border border-afcon-red focus:border-afcon-gold focus:outline-none transition-colors text-white"
                />

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs mb-1 text-gray-400 uppercase font-bold">{teamA.code} Score</label>
                        <input
                            type="number"
                            min="0"
                            value={scoreA}
                            onChange={(e) => setScoreA(e.target.value)}
                            className="w-full p-3 rounded bg-black/50 border border-afcon-red focus:border-afcon-gold outline-none text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs mb-1 text-gray-400 uppercase font-bold">{teamB.code} Score</label>
                        <input
                            type="number"
                            min="0"
                            value={scoreB}
                            onChange={(e) => setScoreB(e.target.value)}
                            className="w-full p-3 rounded bg-black/50 border border-afcon-red focus:border-afcon-gold outline-none text-white"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-[#d48c00] hover:bg-afcon-gold text-black font-black rounded-lg transition-all uppercase mt-4 shadow-lg active:scale-95"
                >
                    Submit Prediction
                </button>
            </div>
        </section>
    );
};

export default PredictionForm;
