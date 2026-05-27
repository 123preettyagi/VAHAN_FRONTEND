import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Map from "./components/Map";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./components/Payment";
import VerifyReceipt from "./components/VerifyReceipt";
import FeedbackForm from "./components/FeedbackForm";

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
    <Router>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
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

        {/* Payment  Page */}
        <Route
          path="/Payment"
          element={
            <Layout>
              <Payment/>
            </Layout>
          }
        />

        {/* Verify Receipt Page */}
        <Route
          path="/verify-receipt"
          element={
            <Layout>
              <VerifyReceipt />
            </Layout>
          }
        />
{/*  Feedbackform page  */}
<Route
  path="/feedback"
  element={
    <Layout>
      <FeedbackForm />
    </Layout>
  }
/>


 {/*  ADD THIS ROUTE */}
        <Route
          path="/check-status"
          element={<FeedbackStatus />}
        />

      </Routes>
    </Router>
  );
}


// ADD THIS LINE AT THE BOTTOM
export default App;