import { LogoDark, LogoLight, LogoMobile } from '../../Icons/Icons';

// Responsive Logo component with theme support
const Logo = () => {
    return (
        <div id="logo" className="bg-white py-5 px-4 dark:bg-[#2B2C37] sm:py-7 sm:px-6 lg:py-8 lg:px-8 transition-colors duration-200">
            <LogoLight className={`hidden dark:sm:block`} />
            <LogoDark className={`hidden sm:block dark:sm:hidden`} />
            <LogoMobile className={`sm:hidden`} />
        </div>
    );
};

export default Logo;
