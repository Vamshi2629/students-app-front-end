import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../Login/Login";
import Signup from "../Signup/SignupStep1";
import Home from "../Components/Home";
import StudentsCreate from "../Components/StudentsCreate";
import Students from "../Components/Students";
// import OtpVerification from "../Signup/SignupStep2";
// import SetPassword from "../Signup/SetPassword";
import SignupPage from "../Signup/SignupPage";
import Subjects from "../Components/Subjects/Subjects";
import BookViewer from "../Components/Subjects/BookViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage  />} />
         {/* <Route path="/verify-otp" element={<OtpVerification />} /> */}
          {/* <Route path="/set-password" element={<SetPassword />} /> */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/students-create" element={<StudentsCreate />} />
          <Route path="/students" element={<Students />} />
           <Route path="/books" element={<Subjects />} />
        <Route path="/book/:id" element={<BookViewer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
