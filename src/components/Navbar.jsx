import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() 
{

const navigate = useNavigate();
 const [showAdminMenu, setShowAdminMenu] = useState(false);
 const [showVehicleMenu, setShowVehicleMenu] = useState(false);

 
const btn =
  "bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer";
  return (
    <div className="flex gap-4 p-4 bg-gray-200 flex-wrap text-center">

      <button
  className={btn}
  onClick={() => window.open("/Payment", "_blank")}
>
  Know Your Payment Transaction Status
</button>

<Link
  to="/verify-receipt"
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Verify Receipt
</Link>

      
     

     <Link to="/feedback" className={btn}>
  Feedback/Complaint
</Link>
{/* Vehicle Services Dropdown */}
<div
  className="relative"
  onMouseEnter={() => setShowVehicleMenu(true)}
  onMouseLeave={() => setShowVehicleMenu(false)}
>
  <button className={btn}>
    Vehicle Services ▼
  </button>

  {showVehicleMenu && (
    <div className="absolute left-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
      
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => navigate("/noc-issued-vehicle")}
      >
        NOC Issued Vehicle
      </button>

      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => navigate("/temporary-registered-vehicle")}
      >
        Temporary Registered Vehicle
      </button>

    </div>
  )}
</div>

   {/*   <button className={btn}>Apply For New Registration</button> */}

 {/* Admin Dropdown */}
     <div
  className="relative ml-auto"
  onMouseEnter={() => setShowAdminMenu(true)}
  onMouseLeave={() => setShowAdminMenu(false)}
>
  <button className={btn}>
    Admin Users
  </button>


      {showAdminMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/appointment-login")}
            >
              Appointment Login
            </button>

            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/helpdesk-login")}
            >
              Helpdesk Login
            </button>

            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/rto-login")}
            >
              RTO Login
            </button>
          </div>
        )}

    </div>
      </div>

    
  );

}

export default Navbar;