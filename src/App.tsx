import { Box, CircularProgress } from "@mui/material"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from '@root/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@root/pages/SignIn'),
    ErrorBoundary: ErrorPage
  },
  {
    path: '/order/:orderNumber',
    lazy: () => import('@root/pages/OrderView'),
    ErrorBoundary: ErrorPage
  },
  {
    path: '/error',
    element: <ErrorPage />
  }
])
function App() {

  return (
    <Box component='main' height='100%'>
      <RouterProvider router={router} fallbackElement={<CircularProgress size={50} />} />
    </Box>
  )
}

export default App
