import './App.css';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import UserScreen from './Screens/UserScreen';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
   <>
    <Router>
      <Routes>
        <Route path='/' element={<UserScreen />} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
