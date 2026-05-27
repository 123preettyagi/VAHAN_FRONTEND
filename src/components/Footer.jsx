function Footer() {
  return (
    <footer className="w-full bg-[#2d2d2d] text-white py-8 mt-auto border-t border-gray-600">
      
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8">
        
        {/* Left Logo */}
        <div className="flex items-center">
          <img
            src="NIC.jpg"
            alt="NIC Logo"
            className="h-40 w-auto object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="text-sm opacity-90 text-center leading-relaxed">
          VAHAN 4.0 (Citizen Services) ~SP-MORTH-WS03~175~8000 | 
          vahan.parivahan.gov.in (Build Version:033020261100) | 
          Site Best viewed in Google Chrome | 
          Ministry of Road Transport & Highways (MoRTH), Government of India
        </div>

        <div></div>
      </div>
    </footer>
  );
}

export default Footer;