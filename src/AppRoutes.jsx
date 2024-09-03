import {
    createBrowserRouter
} from "react-router-dom";
import App from './App.jsx';
import RealEstateWebsites from "./RealEstateWebsites.jsx";
import SiteConfig from "./SiteConfig.jsx";
import Logs from "./Logs.jsx";
import SiteDetails from "./SiteDetails.jsx";
import LogDetails from "./LogDetails.jsx";
import Login from "./Login.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/real-estate-websites',
    element: <RealEstateWebsites />
  },
  {
    path: '/real-estate-websites/:id',
    element: <SiteDetails />
  },
  {
    path: '/site-config',
    element: <SiteConfig />
  },
  {
    path: '/logs',
    element: <Logs />
  },
  {
    path: '/logs/:id',
    element: <LogDetails />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;