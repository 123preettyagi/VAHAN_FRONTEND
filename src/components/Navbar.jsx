import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() 
{

const navigate = useNavigate();

 { /* const btn =
    "bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out";
*/}
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

      
     {/* <button className={btn}>Feedback/Complaint</button> */}

     <Link to="/feedback" className={btn}>
  Feedback/Complaint
</Link>

      <button className={btn}>New Registration</button>


     
      <button className={`${btn} ml-auto`}>Admin Users</button>

    </div>
  );

}

export default Navbar;