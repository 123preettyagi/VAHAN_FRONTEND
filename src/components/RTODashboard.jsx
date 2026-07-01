import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function RTODashboard() 
{
  const navigate = useNavigate();
  const stats = [
    {
      title: "Registered Vehicles",
      value: "12,450",
      color: "from-cyan-500 to-blue-500",
      icon: "🚗",
    },
    {
      title: "Pending Challans",
      value: "1,256",
      color: "from-orange-500 to-red-500",
      icon: "📋",
    },
    {
      title: "Reports Generated",
      value: "560",
      color: "from-purple-500 to-pink-500",
      icon: "📊",
    },
    {
      title: "Driving Licenses",
      value: "8,340",
      color: "from-green-500 to-emerald-500",
      icon: "🪪",
    },
  ];

  const services = [
    {
      icon: "🚗",
      title: "Vehicle Registration",
      desc: "Register new vehicles and update ownership details.",
    },
    {
      icon: "🪪",
      title: "Driving License",
      desc: "Issue, renew and verify driving licenses.",
    },
    {
      icon: "📋",
      title: "Challan Records",
      desc: "View and manage all traffic challans.",
    },
    {
      icon: "🚌",
      title: "Permit Management",
      desc: "Approve and manage commercial permits.",
    },
    {
      icon: "📊",
      title: "Reports",
      desc: "Generate monthly and yearly reports.",
    },
    {
      icon: "⚙️",
      title: "Administration",
      desc: "Manage users and system settings.",
    },
  ];

  const activities = [
    {
      title: "Vehicle Registration Approved",
      color: "border-cyan-500 bg-cyan-50",
    },
    {
      title: "Driving License Issued",
      color: "border-green-500 bg-green-50",
    },
    {
      title: "Challan Payment Received",
      color: "border-orange-500 bg-orange-50",
    },
    {
      title: "Monthly Report Generated",
      color: "border-purple-500 bg-purple-50",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 py-5 px-4">

        <div className="max-w-6xl mx-auto">

          {/* Hero */}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-6 shadow-xl text-white">

            <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full"></div>

            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/10 rounded-full"></div>

            <div className="relative flex flex-col lg:flex-row justify-between items-center">

              <div className="max-w-xl">

                <h1 className="text-3xl font-bold">
                  Welcome to RTO Dashboard 🚦
                </h1>

                <p className="mt-3 text-sm text-cyan-100 leading-6">
                  Manage vehicle registrations, licenses, permits,
                  challans and reports from one centralized portal.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <button className="bg-white text-cyan-700 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    Explore Services
                  </button>

                  <button className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-cyan-700 transition">
                    View Reports
                  </button>

                </div>

              </div>

              <div className="text-6xl mt-5 lg:mt-0">
                🚗
              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-xl hover:-translate-y-1 transition"
              >

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl`}
                >
                  {item.icon}
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {item.value}
                </h2>

              </div>

            ))}

          </div>

          {/* Services */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {services.map((service, index) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:scale-105 transition"
                >

                  <div className="text-4xl">
                    {service.icon}
                  </div>

                  <h3 className="font-bold text-lg mt-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {service.desc}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-lg p-5 mt-8">

            <h2 className="text-2xl font-bold mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <button
       onClick={() => navigate("/AddVehicle")}
      className="bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition">
        ➕ Add Vehicle
       </button>

              <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                🪪 Add License
              </button>

              <button className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
                📋 View Challans
              </button>

              <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                📊 Generate Report
              </button>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-2xl shadow-lg p-5 mt-8 mb-6">

            <h2 className="text-2xl font-bold mb-4">
              Recent Activity
            </h2>

            <div className="space-y-3">

              {activities.map((item, index) => (

                <div
                  key={index}
                  className={`border-l-4 ${item.color} rounded-md p-3 text-sm`}
                >
                  {item.title}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default RTODashboard;