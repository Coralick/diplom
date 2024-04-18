import Registr from './pages/registr/registr';
import Entrance from './pages/enterence/Entrance';
import {Routes, Route} from 'react-router-dom'
import './css/style.css'
import Home from './pages/home/home';
import Layout from './pages/Layout';
import TaskBoard from './pages/TaskBoard/TaskBoard';


function App() {
  return (
      <div>
        <Routes>
          <Route path='/'element= {<Entrance />} />
          <Route exact path='/registr'element= {<Registr />} />
          <Route path='/' element={<Layout/>}>
            <Route path='table' element={<Home/>}/>
            <Route path='task/:id' element={<TaskBoard/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
