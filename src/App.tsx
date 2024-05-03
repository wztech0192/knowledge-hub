import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomThemeProvider } from './providers/CustomThemeProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
//import { PlaceholderPage } from './pages/PlaceholderPage';
import { MetadataContextProvider } from './providers/MetadataContextProvider';
import Subject from './pages/Subject';
import SubTopic from './pages/SubTopic';

/**
 * Handles routing
 * @see https://reactrouter.com/en/main/routers/create-browser-router
 */

//Changed the path names from /c, /s, /t to /category, /subject and /topic to be more understandable.
const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        /*{
          path: '/placeholder/:id',
          element: <PlaceholderPage />,
        },*/
        {
          path: '/category/:categoryId/subject/:subjectId',
          element: <Subject />,
        },
        {
          path: '/category/:categoryId/subject/:subjectId/topic/:topicId/subtopic/:subTopicId',
          element: <SubTopic />,
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
