import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/home.jsx";
import { Profile } from "./routes/profile.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Search from "./routes/search.jsx";
import Register from "./routes/register.jsx";
import Staff from "./routes/staff.jsx";
import { StaffDashboard } from "./routes/staffdashboard.jsx";
import { StudentInfo } from "./routes/studentInfo.jsx";
import { EditStudent } from "./routes/edit_student.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/staff" element={<Staff />} exact />
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/search" element={<Search />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/staff/dashboard" element={<StaffDashboard />} exact />
        <Route
          path="/staff/dashboard/inspect"
          element={<StudentInfo />}
          exact
        />
        <Route
          path="/staff/dashboard/edit_student"
          element={<EditStudent />}
          exact
        />
      </Route>
    </Routes>
  );
}

export default App;
