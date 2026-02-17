import React, { useState } from 'react';

const ScoreBanner = ({ teamA, teamB, scoreA, scoreB, onOpenModal }) => {
    // Helper to style numbers, specifically '4' as per original CSS
    const renderScore = (score) => {
        return String(score).split('').map((char, idx) => (
            char === '4'
                ? <span key={idx} style={{ fontFamily: 'AFCON-Font', position: 'relative', top: '-7px' }}>4</span>
                : <span key={idx}>{char}</span>
        ));
    };

    return (
        <div className="flex justify-center mb-10 w-full relative z-20 mt-[-40px] max-md:mt-[-40px]">
            <div className="w-[850px] h-[97px] bg-afcon-dark shadow-lg flex justify-between items-center relative border-none 
                max-md:w-[60vw] max-md:h-[8vw] max-md:min-h-[35px] max-md:mt-[-40px]">

                {/* Team A Image */}
                <img
                    src={teamA.img}
                    alt={teamA.name}
                    className="h-[99px] w-auto object-contain block z-10 -translate-x-[70%] flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-115 hover:brightness-125
                        max-md:h-[9.5vw]"
                    onClick={() => onOpenModal('A')}
                />

                {/* Team A Name */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-afcon text-white text-[37px] tracking-[1px] z-[4] uppercase pointer-events-none whitespace-nowrap ml-[-230px]
                    max-md:text-[2.5vw] max-md:ml-[-16vw]">
                    {teamA.name}
                </span>

                {/* Team A Score */}
                <span className="font-sald absolute top-0 h-full w-[65px] bg-white text-afcon-dark font-black text-[70px] z-[6] select-none flex items-center justify-center left-1/2 -translate-x-1/2 ml-[-65px] pt-[11px]
                    max-md:w-[5.2vw] max-md:text-[4.3vw] max-md:pt-[0.5vw] max-md:ml-[-5.2vw]">
                    {renderScore(scoreA)}
                </span>

                {/* Center Image */}
                <img
                    src="/assets/images/cafi.webp"
                    alt="vs"
                    className="h-[75%] w-auto object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] drop-shadow-md"
                />

                {/* Team B Score */}
                <span className="font-sald absolute top-0 h-full w-[65px] bg-white text-afcon-dark font-black text-[70px] z-[6] select-none flex items-center justify-center left-1/2 -translate-x-1/2 ml-[65px] pt-[11px]
                    max-md:w-[5.2vw] max-md:text-[4.3vw] max-md:pt-[0.5vw] max-md:ml-[5.2vw]">
                    {renderScore(scoreB)}
                </span>

                {/* Team B Name */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-afcon text-white text-[37px] tracking-[1px] z-[4] uppercase pointer-events-none whitespace-nowrap ml-[230px]
                    max-md:text-[2.5vw] max-md:ml-[17vw]">
                    {teamB.name}
                </span>

                {/* Team B Image */}
                <img
                    src={teamB.img}
                    alt={teamB.name}
                    className="h-[99px] w-auto object-contain block z-10 translate-x-[70%] flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-115 hover:brightness-125
                        max-md:h-[9.5vw]"
                    onClick={() => onOpenModal('B')}
                />
            </div>
        </div>
    );
};

export default ScoreBanner;
