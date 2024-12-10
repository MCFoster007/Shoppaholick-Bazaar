import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import ShoppingSearch from './pages/ShoppingSearch.js'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Signup from './pages/Signup';
import Home from './pages/Home'
import ErrorPage from './pages/Error.js'
import FriendsNmessage from './pages/FriendsNmessage.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
     children: [
       {
         index: true,
         element: <Home />
       }, {
         path: '/login',
         element: <Login />
       }, {
         path: '/signup',
         element: <Signup />
       }, {
         path: '/shopping',
         element: <ShoppingSearch />
       }, {
       }, {
        path: '/friends',
        element: <FriendsNmessage />
       }, {
         path: '/logout',
         element: <Logout />
       }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
