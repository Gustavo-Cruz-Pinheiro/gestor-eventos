import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App
