import "./App.css";
import Auth from "./Components/AuthPage/auth";
import { Route, Routes } from "react-router";
import Expense from "./Components/Expense/expense";
import ForgotPassword from "./Components/AuthPage/Forgotpassword";
import Password from "./Components/AuthPage/password";
import ReportGeneration from "./Components/Body/reportGeneration";
import Errorpage from "./Components/ErrorPage/Errorpage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:userId" element={<Password />} />
      <Route path="/reportgeneration" element={<ReportGeneration />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

export default App;
