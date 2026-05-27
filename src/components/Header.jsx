function Header() {
  return (
    <div className="bg-gradient-to-r from-sky-700 via-blue-600 to-teal-400 text-white border-b-4 border-yellow-500">
      
      <div className="flex items-center justify-between px-8 py-4">
        
        {/* LEFT SECTION: Logo and Text side by side */}
        <div className="flex items-center gap-4">
          
          {/* Ashoka Logo - Adjusted size */}
          <img
  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
  alt="India Emblem"
  className="h-10 w-auto shrink-0 object-contain brightness-0 invert"
/>

          {/* TEXT SECTION */}
          <div className="flex flex-col justify-center border-l border-white/30 pl-4 leading-tight">
            <h1 className="text-2xl font-bold tracking-wider">
              VAHAN CITIZEN SERVICES
            </h1>
            <p className="text-sm opacity-90">
              Government of India
            </p>
            <p className="text-xs font-semibold uppercase tracking-tighter">
              Ministry of Road Transport and Highways
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center">
          <div className="bg-white p-1 rounded">
            <img
              src="swach.jpg"
              alt="Swachh Bharat"
              className="h-12"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;