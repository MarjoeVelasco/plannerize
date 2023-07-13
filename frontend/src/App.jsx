import Drawer from './components/navigation/drawer';
import CalendarPage from './components/pages/CalendarPage';
import { AuthProvider } from './components/routes/AuthProvider';
import RouterProvider from './components/routes/RouterProvider';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
          <RouterProvider />
      </BrowserRouter>
    </div>
  );
}

export default App;
