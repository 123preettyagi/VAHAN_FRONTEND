import Header from "./Header";
import Footer from "./Footer";

function AppointmentDashboard() {
  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-2xl p-8 mb-10">

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>

          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-16 -translate-x-10"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                👤
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Welcome, {username}
                </h1>

                <p className="text-cyan-100 mt-1">
                  Manage your appointments with ease.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                📅 Appointment Portal
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                ⚡ Fast Booking
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                🔒 Secure Access
              </span>
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Book Appointment */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white hover:scale-105 transition duration-300 p-8">

            <div className="text-6xl mb-4">📅</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Book Appointment
            </h2>

            <p className="text-gray-600 mb-6">
              Schedule a new appointment quickly and easily.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/book-appointment")
              }
              className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg"
              //className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Book Now
            </button>
          </div>

          {/* My Appointments */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white hover:scale-105 transition duration-300 p-8">

            <div className="text-6xl mb-4">📋</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              My Appointments
            </h2>

            <p className="text-gray-600 mb-6">
              View and manage all your scheduled appointments.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/view-appointments")
              }
              className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg"
              //className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              View Appointments
            </button>
          </div>

          {/* Logout */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white hover:scale-105 transition duration-300 p-8">

            <div className="text-6xl mb-4">🚪</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Logout
            </h2>

            <p className="text-gray-600 mb-6">
              Securely sign out from your account.
            </p>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Appointments</p>
                  <h3 className="text-4xl font-bold text-blue-600 mt-2">
                    12
                  </h3>
                </div>

                <div className="text-5xl">📅</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Upcoming</p>
                  <h3 className="text-4xl font-bold text-green-600 mt-2">
                    5
                  </h3>
                </div>

                <div className="text-5xl">⏳</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-purple-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Completed</p>
                  <h3 className="text-4xl font-bold text-purple-600 mt-2">
                    7
                  </h3>
                </div>

                <div className="text-5xl"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <button className="bg-blue-50 hover:bg-blue-100 p-5 rounded-2xl transition">
              📅
              <p className="mt-2 font-medium">
                New Booking
              </p>
            </button>

            <button className="bg-green-50 hover:bg-green-100 p-5 rounded-2xl transition">
              📋
              <p className="mt-2 font-medium">
                View Records
              </p>
            </button>

            <button className="bg-yellow-50 hover:bg-yellow-100 p-5 rounded-2xl transition">
              🔔
              <p className="mt-2 font-medium">
                Notifications
              </p>
            </button>

            <button className="bg-purple-50 hover:bg-purple-100 p-5 rounded-2xl transition">
              ⚙️
              <p className="mt-2 font-medium">
                Settings
              </p>
            </button>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AppointmentDashboard;