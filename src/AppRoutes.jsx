import {
    createBrowserRouter
} from "react-router-dom";
import App from './App.jsx';
import RealEstateWebsites from "./RealEstateWebsites.jsx";
import SiteConfig from "./SiteConfig.jsx";
import Logs from "./Logs.jsx";

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
    path: '/site-config',
    element: <SiteConfig />
  },
  {
    path: '/logs',
    element: <Logs />
  }
]);

export default router;