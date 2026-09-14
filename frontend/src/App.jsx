import './App.css'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Books from './pages/Books'
import Issue from './pages/issueReturn'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from './pages/signup'
import Addbook from './pages/addbook'
import Addstudents from "./pages/addstudents";
import Editstudents from './pages/editstd'
import Issuebk from './pages/issue'
import Return from './pages/return'
import Profile from './pages/profile';
import Layout from "./pages/layout";
import Editbook from "./pages/editbook";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";


function App() {

    return (
        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

             {/* Student Routes */}
    <Route path="/student/login" element={<StudentLogin />} />
    
    <Route path="/student/dashboard" element={<StudentDashboard />}/>


            {/* Protected Admin Routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<Layout />}>

                    <Route path="/Dashboard" element={<Dashboard />} />

                    <Route path="/Books" element={<Books />} />

                    <Route path="/Students" element={<Students />} />

                    <Route path="/issueReturn" element={<Issue />} />

                </Route>


                <Route path="/addbook" element={<Addbook />} />

                <Route path="/editbook/:id" element={<Editbook />} />

                <Route path="/addstudents" element={<Addstudents />} />

               <Route path="/editstd/:id"  element={<Editstudents />}/>

                <Route path="/issue" element={<Issuebk />} />

                <Route path="/return" element={<Return />} />

                <Route path="/profile" element={<Profile />} />

            </Route>

        </Routes>
    )
}

export default App;
