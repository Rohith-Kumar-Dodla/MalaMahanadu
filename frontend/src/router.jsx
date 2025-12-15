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
import MembershipSuccess from './pages/MembershipSuccess';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import MemberDashboard from './pages/admin/MemberDashboard';
import MemberDetails from './pages/admin/MemberDetails';
import DonationsManagement from './pages/admin/DonationsManagement';
import ComplaintsManagement from './pages/admin/ComplaintsManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
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
        path: 'key-persons/:personId',
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
        path: 'membership-success',
        element: <MembershipSuccess />
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
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'members',
        element: <MemberDashboard />
      },
      {
        path: 'members/:id',
        element: <MemberDetails />
      },
      {
        path: 'donations',
        element: <DonationsManagement />
      },
      {
        path: 'complaints',
        element: <ComplaintsManagement />
      },
      {
        path: 'gallery',
        element: <GalleryManagement />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
