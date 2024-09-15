import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomThemeProvider } from './providers/CustomThemeProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MetadataContextProvider } from './providers/MetadataContextProvider';
import Subject from './pages/Subject';
import SubTopic from './pages/SubTopic';
import BookmarkContextProvider from './providers/BookmarksContextProvider';

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
        {
          path: '/category/:categoryId/subject/:subjectId',
          element: <Subject />,
        },
        {
          path: '/category/:categoryId/subject/:subjectId/topic/*',
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
      <BookmarkContextProvider>
        <CustomThemeProvider>
          <RouterProvider router={router} />
        </CustomThemeProvider>
      </BookmarkContextProvider>
    </MetadataContextProvider>
  );
}

export default App;
