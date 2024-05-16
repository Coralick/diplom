import Registr from './pages/registr/registr';
import Entrance from './pages/enterence/Entrance';
import { Routes, Route } from 'react-router-dom'
import './css/style.css'
import Home from './pages/home/home';
import Layout from './pages/Layout';
import TaskBoard from './pages/TaskBoard/TaskBoard';
import TaskDesc from './pages/taskDesc/TaskDesc';

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Entrance />} />
        <Route exact path='/registr' element={<Registr />} />
        <Route path='/' element={<Layout />}>
          <Route path='table' element={<Home />} />
          <Route path='task/:id' element={<TaskBoard />} /> 
        </Route>
        <Route exact path='/task/description/:id' element={<TaskDesc />} />
      </Routes>
    </div>
  );
}

export default App;
