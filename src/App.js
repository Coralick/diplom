import Registr from './pages/registr/registr';
import Entrance from './pages/enterence/Entrance';
import {Routes, Route} from 'react-router-dom'
import './css/style.css'
import Home from './pages/home/home';
import Layout from './pages/Layout';

function App() {
  return (
      <div>
        <Routes>
          <Route exact path='/registr'element= {<Registr />} />
          <Route path='/input'element= {<Entrance />} />
          <Route path='/' element={<Layout/>}>
            <Route path='home' element={<Home/>}/>

          </Route>
        </Routes>
    </div>
  );
}

export default App;
