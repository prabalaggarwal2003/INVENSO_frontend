import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import Inventory from './pages/Inventory.jsx'
import AddRooms from './pages/AddRooms.jsx'
import AddType from './pages/AddType.jsx'
import AddEquipment from './pages/AddEquipment.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import UserPanel from './pages/UserPanel.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UserInputForm from './pages/UserInputForm.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/inventory",
          element: <Inventory/>,
        },
        {
          path: "/addrooms",
          element: <AddRooms/>,
        },
        {
          path: "/addtype",
          element: <AddType/>,
        },
        {
          path: "/addequipment",
          element: <AddEquipment/>,
        },
        {
          path: "/adminpanel",
          element: <AdminPanel/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path: "/login",
          element: <LogIn/>
        },
        {
          path: "/userpanel",
          element: <UserPanel/>
        },
        {
          path: "/userprofile",
          element: <UserProfile/>
        },
        {
          path: "/:equipmentType/:equipmentId",
          element: <UserInputForm />
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

