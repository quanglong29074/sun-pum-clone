import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className='border-t border-gray-800 text-white flex flex-col items-center text-center md:flex-row md:justify-between w-[85%] mx-auto py-10'>
      <div className="text-gray-400 text-sm mb-4 md:mb-0">
        <span className='mx-1'>© 2025 SunPump. All rights reserved</span>
      </div>
      <div className="text-gray-400 text-sm">
        This site is protected by reCAPTCHA and the Google
        <span className="text-[#B482FF]"> Privacy Policy </span>
        and
        <span className="text-[#B482FF]"> Terms of Service </span>
        apply.
      </div>
    </footer>

  )
}
export default Footer;