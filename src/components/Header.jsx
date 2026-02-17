import React from 'react';

const Header = () => {
    return (
        <header className="logo-header flex items-center px-5 py-5 gap-3 mb-8 z-10 w-full lg:flex-wrap lg:justify-start
            max-lg:flex-nowrap max-lg:justify-between max-lg:px-2.5 max-lg:py-4 max-lg:gap-0 max-lg:overflow-x-hidden box-border">

            <img src="/assets/images/caf.webp" alt="caf" className="logo-item h-[50px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/cmc.webp" alt="cmc" className="logo-s h-[40px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/dia.webp" alt="dia" className="logo-item h-[50px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/AIG.webp" alt="AIG" className="logo-item h-[50px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/arti.webp" alt="arti" className="logo-item h-[50px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/fablab.webp" alt="fablab" className="logo-b h-[53px] w-auto object-contain max-lg:h-[8vw]" />
            <img src="/assets/images/bet.webp" alt="" className="separator h-[25px] w-auto opacity-80 max-lg:h-[5vw]" />

            <img src="/assets/images/y.webp" alt="y" className="logo-y h-[41px] w-auto object-contain max-lg:h-[8vw]" />
        </header>
    );
};

export default Header;

