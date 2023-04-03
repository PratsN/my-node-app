import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Forgot from "./Components/Forgot";
import AddUser from "./Components/AddUser";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route path="/adduser" element={<AddUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
