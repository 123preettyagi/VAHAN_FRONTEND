function Sidebar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-[320px] overflow-hidden border">
      
      {/* Header */}
      <div className="bg-teal-700 text-white text-center py-3 text-lg font-semibold">
        Choose option to avail Services
      </div>

      <div className="p-4">
        
        {/* Options */}
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-700">
          
          <div className="flex items-center gap-2">
            <img
              src="vehicle.jpg"
              alt="vehicle"
              className="w-12 h-12"
            />
            <span>Vehicle Registration No.</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
              alt="authority"
              className="w-8 h-8"
            />
            <span>Registering Authority</span>
          </div>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="ENTER REGISTRATION NUMBER"
          className="w-full p-3 mb-4 border rounded-xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Select State */}
        <select className="w-full p-3 mb-4 border rounded-xl bg-gray-100 text-gray-600 focus:outline-none">
          <option>SELECT STATE</option>
        </select>

        {/* Select RTO */}
        <select className="w-full p-3 mb-4 border rounded-xl bg-gray-100 text-gray-600 focus:outline-none">
          <option>SELECT RTO</option>
        </select>

        {/* Checkbox */}
        <div className="flex items-start gap-2 text-sm mb-4">
          <input type="checkbox" className="mt-1" />
          <p>
            I accept to have read the{" "}
            <span className="text-red-600 font-medium cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="text-red-600 font-medium cursor-pointer">
              Terms of Service
            </span>{" "}
            for processing of my personal data into the system
          </p>
        </div>

        {/* Button */}
        <button className="w-full bg-teal-600 text-white py-3 rounded-xl shadow-md hover:bg-teal-700 transition">
          Proceed
        </button>
      </div>
    </div>
  );
}

export default Sidebar;