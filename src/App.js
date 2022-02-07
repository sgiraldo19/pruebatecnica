import Login from './pages/login';
import Post from './pages/post';
//import Auth from './components/auth';
import { useUserContext } from "./context/userContext";
import './Styles/App.css';


function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Post /> : <Login />} </>}
    </div>
  );
}

export default App;