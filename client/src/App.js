import './App.css';
import Main from './components/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Contact from './pages/Contact';
import About from './pages/About';
import Job from './pages/Job';
import Login from './pages/Login';
import Register from './pages/Register';
import Filtered from './pages/Filtered';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import CreateJob from './pages/CreateJob';
import EditUser from './pages/EditUser';
import EditJob from './pages/EditJob';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/job/:id' element={<Job />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/location/:location' element={<Filtered />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/admin/dashboard' element={<Dashboard />}/>
          <Route path='/admin/users' element={<Users />}/>
          <Route path='/admin/jobs' element={<Jobs />}/>
          <Route path='/admin/users/create' element={<CreateUser />}/>
          <Route path='/admin/user/edit/:id' element={<EditUser />}/>
          <Route path='/admin/jobs/create' element={<CreateJob />}/>
          <Route path='/admin/jobs/edit/:id' element={<EditJob />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
