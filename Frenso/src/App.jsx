import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/auth/Action';
import HomePage from './components/homepage/HomePage';
import Authentication from './components/authentication/Authentication';

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const jwt = auth.jwt || localStorage.getItem('jwt');

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
      navigate('/home');
    }
  }, [jwt, auth.user, dispatch]);

  return (
    <Routes>
      <Route
        path="/*"
        element={auth.user ? <HomePage /> : <Authentication />}
      />
    </Routes>
  );
}

export default App;
