import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import DashBoard from "./pages/dashBoard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import PageNotFound from "./pages/pageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />}>
            //TODO: Validate the user exist
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
