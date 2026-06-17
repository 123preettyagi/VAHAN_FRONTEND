import Header from "./Header";
import Footer from "./Footer";

function VahanDashboard() {
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const actions = [
    {
      icon: "📝",
      title: "Register Complaint",
      desc: "Submit a new complaint regarding your vehicle.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "🔍",
      title: "Track Complaint",
      desc: "Check the latest status of your complaint.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "📂",
      title: "My Complaints",
      desc: "View all complaints submitted by you.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: "🚪",
      title: "Logout",
      desc: "Securely sign out from your account.",
      color: "from-red-500 to-pink-600",
      action: logout,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100">
      <Header />

      <main className="flex-1 px-4 py-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-6 shadow-xl mb-6">

            <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20"></div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🚗 Vahan Complaints Portal
              </h1>

              <p className="text-cyan-100 text-base">
                Welcome back,
                <span className="font-bold text-white ml-2">
                  {username}
                </span>
              </p>

              <p className="text-cyan-100 mt-2 max-w-xl text-sm">
                Register, track and manage your vehicle complaints through a
                secure and transparent system.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-4xl mb-2">📑</div>
              <h3 className="text-gray-500 text-sm">Total Complaints</h3>
              <p className="text-3xl font-bold text-cyan-600">12</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-4xl mb-2">⏳</div>
              <h3 className="text-gray-500 text-sm">In Progress</h3>
              <p className="text-3xl font-bold text-yellow-500">4</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-gray-500 text-sm">Resolved</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>

          </div>

          {/* Action Cards */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {actions.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden relative"
              >
                <div
                  className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${item.color}`}
                ></div>

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color}
                  flex items-center justify-center text-2xl mb-3
                  group-hover:rotate-6 transition`}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {item.desc}
                </p>

                <div className="mt-3 text-cyan-600 font-semibold opacity-0 group-hover:opacity-100 transition">
                  Open →
                </div>
              </button>
            ))}

          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold">
                    Complaint #VH12345
                  </p>
                  <p className="text-gray-500 text-sm">
                    Vehicle Registration Issue
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                  In Progress
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold">
                    Complaint #VH12340
                  </p>
                  <p className="text-gray-500 text-sm">
                    RC Transfer Delay
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Resolved
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VahanDashboard;