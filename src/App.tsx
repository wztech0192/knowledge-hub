import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomThemeProvider } from './providers/CustomThemeProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { MetadataContextProvider } from './providers/MetadataContextProvider';
import Subject from './pages/Subject';
import Topic from './pages/Topic';

/**
 * Handles routing
 * @see https://reactrouter.com/en/main/routers/create-browser-router
 */
const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/placeholder/:id',
          element: <PlaceholderPage />,
        },
        {
          path: '/c/:categoryId/s/:subjectId',
          element: <Subject />,
        },
        {
          path: '/c/:categoryId/s/:subjectId/t/*',
          element: <Topic />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

function App() {
  return (
    <MetadataContextProvider>
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </MetadataContextProvider>
  );
}

export default App;
