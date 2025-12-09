import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import KeyPersons from './pages/KeyPersons';
import DistrictPresidents from './pages/DistrictPresidents';
import Gallery from './pages/Gallery';
import Posts from './pages/Posts';
import SinglePost from './pages/SinglePost';
import Complaints from './pages/Complaints';
import Contact from './pages/Contact';
import Donations from './pages/Donations';
import Membership from './pages/Membership';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'key-persons',
        element: <KeyPersons />
      },
      {
        path: 'district-persons',
        element: <DistrictPresidents />
      },
      {
        path: 'gallery',
        element: <Gallery />
      },
      {
        path: 'posts',
        element: <Posts />
      },
      {
        path: 'posts/:id',
        element: <SinglePost />
      },
      {
        path: 'complaints',
        element: <Complaints />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'donations',
        element: <Donations />
      },
      {
        path: 'membership',
        element: <Membership />
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: 'terms',
        element: <Terms />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
