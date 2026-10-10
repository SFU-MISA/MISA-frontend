import { createBrowserRouter } from 'react-router'
import Layout from './components/layout/Layout.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Team from './pages/Team.tsx'
import NotFound from './pages/NotFound.tsx'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/team', element: <Team /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
