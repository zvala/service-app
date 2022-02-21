import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import DashBoard from "./pages/dashBoard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import PageNotFound from "./pages/pageNotFound";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./components/router/privateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
