import "./App.css";
import { lazy, Suspense } from "react";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import AdminPage from "./pages/AdminPage";

const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Job = lazy(() => import("./pages/Job"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Filtered = lazy(() => import("./pages/Filtered"));
const Search = lazy(() => import("./pages/Search"));
// const EditUser = lazy(() => import("./pages/EditUser"));
// const EditJob = lazy(() => import("./pages/EditJob"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/location/:location" element={<Filtered />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* <Route path="/admin/user/edit/:id" element={<EditUser />} />
            <Route path="/admin/jobs/edit/:id" element={<EditJob />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
