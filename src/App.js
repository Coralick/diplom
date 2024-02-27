import Registr from './pages/registr/registr';
import Entrance from './pages/input/Entrance';
import {Routes, Route} from 'react-router-dom'
import './style/style.css'

function App() {
  return (
        <div>
      <div>
      </div>
      {/* <Registr />
      <Input /> */}
      <Routes>
        <Route exact path='/'element= {<Registr />} />
        <Route path='/input'element= {<Entrance />} />
      </Routes>
    </div>

  );
}

export default App;
