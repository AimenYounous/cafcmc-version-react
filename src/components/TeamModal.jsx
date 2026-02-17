import React from 'react';

const teams = [
    { code: 'MOR', name: 'MOROCCO', img: '/assets/images/mar.webp' },
    { code: 'SEN', name: 'SENEGAL', img: '/assets/images/sngl.webp' },
    { code: 'NIG', name: 'NIGERIA', img: '/assets/images/nig.webp' },
    { code: 'EGY', name: 'EGYPT', img: '/assets/images/egy.webp' },
];

const TeamModal = ({ isOpen, onClose, onSelectTeam }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10001] flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-afcon-dark p-8 rounded-2xl border border-afcon-gold/50 max-w-lg w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-afcon-gold">CHOOSE A TEAM</h2>
                <div className="grid grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <div
                            key={team.code}
                            className="p-4 rounded-xl text-center cursor-pointer transition-all duration-300 border-2 border-transparent
                                hover:scale-110 hover:border-afcon-gold hover:bg-white/10 hover:drop-shadow-[0_0_15px_#fbbf24]"
                            onClick={() => onSelectTeam(team)}
                        >
                            <img src={team.img} alt={team.name} className="h-16 mx-auto mb-2 object-contain" />
                            <p className="font-bold text-white">{team.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamModal;
