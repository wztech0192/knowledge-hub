import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Bookmark {
  name: string;
  path: string;
  topic: string;
  pageNumber: number;
}

interface BookmarksContext {
  bookmarks: Bookmark[];
  toggleBookmarks(bookmark: Bookmark): void;
}

const BookmarkContext = createContext<BookmarksContext>(null!);

export default function BookmarkContextProvider({
  children,
}: PropsWithChildren) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => { //[{name, path, topic, pageNumber}, {name, path, topic, pageNumber}] -- That's what an array of Bookmark means.
    const storedBookmarks = localStorage.getItem('bookmarks');
    console.log(storedBookmarks);
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  const toggleBookmarks = useCallback((bookmarkData: Bookmark) => {
    setBookmarks(currentBookmarks => {
      if (
        currentBookmarks.some(
          b =>
            b.path === bookmarkData.path &&
            b.pageNumber === bookmarkData.pageNumber,
        )
      ) {
        return currentBookmarks.filter(
          b =>
            b.path !== bookmarkData.path ||
            b.pageNumber !== bookmarkData.pageNumber,
        );
      }
      return [...currentBookmarks, bookmarkData];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("context was called outside of it's provider");
  return context;
}
