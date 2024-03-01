import Registr from './pages/registr/registr';
import Entrance from './pages/enterence/Entrance';
import {Routes, Route} from 'react-router-dom'
import './css/style.css'
import Layout from './pages/Layout';
import Home from './pages/home/home';


function App() {
  return (
      <div>
        <Routes>
          <Route exact path='/'element= {<Registr />} />
          <Route path='/input'element= {<Entrance />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
    </div>

  );
}

export default App;
