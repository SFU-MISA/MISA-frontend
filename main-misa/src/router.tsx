import { createBrowserRouter } from 'react-router'
import Layout from './components/layout/Layout.tsx'
import NotFound from './pages/NotFound.tsx'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true },
      { path: '*', element: <NotFound /> },
    ],
  },
])
