import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Map from "./components/Map";
import Footer from "./components/Footer";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Payment from "./components/Payment";
import VerifyReceipt from "./components/VerifyReceipt";
import FeedbackForm from "./components/FeedbackForm";
import AuthPage from "./components/AuthPage";

// 
import FeedbackStatus from "./components/FeedbackStatus";


//  Layout wrapper
function Layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <div className="flex gap-4 p-4">
                <Sidebar />
                <Content />
                <Map />
              </div>
            </Layout>
          }
        />

        <Route
          path="/payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />

        <Route
          path="/verify-receipt"
          element={
            <Layout>
              <VerifyReceipt />
            </Layout>
          }
        />

        <Route
          path="/feedback"
          element={
            <Layout>
              <FeedbackForm />
            </Layout>
          }
        />

        <Route path="/check-status" element={<FeedbackStatus />} />
      </Routes>
    </BrowserRouter>
  );
}


// ADD THIS LINE AT THE BOTTOM
export default App;