import Header from "./Header";
import Footer from "./Footer";

function RTODashboard() {
  const stats = [
    {
      title: "Registered Vehicles",
      value: "12,450",
      color: "from-cyan-500 to-blue-500",
      icon: "🚗",
    },
    {
      title: "Driving Licenses",
      value: "8,932",
      color: "from-green-500 to-emerald-500",
      icon: "🪪",
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
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 py-8 px-4">

        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  RTO Dashboard 🚦
                </h1>

                <p className="mt-4 text-lg text-cyan-100">
                  Welcome back! Manage registrations, licenses,
                  permits and challans efficiently.
                </p>

                <button className="mt-6 bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                  Explore Services
                </button>
              </div>

              <div className="mt-8 md:mt-0">
                <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-5xl shadow-xl border border-white/20">
                  🚗
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-4 text-gray-500 text-sm">
                  {item.title}
                </h3>

                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Service Cards */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition">
                <div className="text-5xl">🚗</div>
                <h3 className="font-bold text-xl mt-4">
                  Vehicle Registration
                </h3>
                <p className="text-gray-500 mt-2">
                  Register and manage vehicle details.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition">
                <div className="text-5xl">🪪</div>
                <h3 className="font-bold text-xl mt-4">
                  Driving License
                </h3>
                <p className="text-gray-500 mt-2">
                  View and update license records.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition">
                <div className="text-5xl">📋</div>
                <h3 className="font-bold text-xl mt-4">
                  Challan Records
                </h3>
                <p className="text-gray-500 mt-2">
                  Check pending and paid challans.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition">
                <div className="text-5xl">📊</div>
                <h3 className="font-bold text-xl mt-4">
                  Reports
                </h3>
                <p className="text-gray-500 mt-2">
                  Generate detailed system reports.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

              <button className="bg-cyan-600 text-white p-4 rounded-xl hover:bg-cyan-700 hover:scale-105 transition">
                ➕ Add Vehicle
              </button>

              <button className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 hover:scale-105 transition">
                🪪 Add License
              </button>

              <button className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700 hover:scale-105 transition">
                📋 View Challans
              </button>

              <button className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 hover:scale-105 transition">
                📊 Generate Report
              </button>

            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                Vehicle Registration Approved
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                New Driving License Issued
              </div>

              <div className="border-l-4 border-orange-500 pl-4 py-2">
                Challan Payment Received
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                Monthly Report Generated
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default RTODashboard;