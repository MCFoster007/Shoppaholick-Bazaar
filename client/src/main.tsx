import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Shopping from './pages/Shopping.js'
import Login from './pages/Login.js'
import Logout from './pages/Logout.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
     children: [
       {
         index: true,
         element: <Login />
       }, {
         path: '/shopping',
         element: <Shopping />
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
