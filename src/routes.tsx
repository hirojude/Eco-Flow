import { Icon } from '@chakra-ui/react';
// import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// Admin Imports
// import MainDashboard from 'views/admin/default';
// import NFTMarketplace from 'views/admin/marketplace';
// import Profile from 'views/admin/profile';
// import DataTables from 'views/admin/dataTables';
// import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from './views/auth/signIn';
import SignUpCentered from './views/auth/signUp';
import HomePage from './views/home/HomePage';



  import { MdPerson, MdHome, MdLock, MdAnalytics  } from 'react-icons/md';
  import { GiPlantWatering } from "react-icons/gi";
  import MainDashboard from './views/admin/default/Dashboard';
  import Profile from './views/admin/profile/index'; // do a Profile.tsx
import Monitoring from './views/admin/Monitoring/index';
import PlantProfile from './views/admin/Plant Profile';
//   import { RoutesType } from './components/types/Types';
  
  const routes = [
    {
      name: 'Main Dashboard',
      layout: '/admin',
      path: '/default',
      icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
      component: MainDashboard
    },
    {
      name: 'Monitoring',
      layout: '/admin',
      path: '/Monitoring',
      icon: <Icon as={MdAnalytics} width='20px' height='20px' color='inherit' />,
      component: Monitoring
    },
    {
      name: 'Plant Profile',
      layout: '/admin',
      path: '/Plant',
      icon: <Icon as={GiPlantWatering} width='20px' height='20px' color='inherit' />,
      component: PlantProfile
    },
    
    {
      name: 'Profile',
      layout: '/admin',
      path: '/profile',
      icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
      component: Profile
    },
    {
      name: 'Sign In',
      layout: '/auth',
      path: '/sign-in',
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignInCentered
    },
    
    {
      name: 'Sign Up',
      layout: '/auth',
      path: '/sign-UP',
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignUpCentered
    },
    {
      name: 'HomePage',
      layout: '/home',
      path: '/homePage',
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: HomePage
    },
];

export default routes;
