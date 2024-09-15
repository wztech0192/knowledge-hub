import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface Bookmark{
    name: string,
    path: string,
    topic: string,
    pageNumber: number
}

const BookmarkContext = createContext<Bookmark | []>([]);

export default function BookmarkContextProvider({children} : PropsWithChildren){
    const [bookmarks, setBookmarks] = useState<any[]>(() => {
        const storedBookmarks = localStorage.getItem('bookmarks');
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    });

    function toggleBookmarks(bookmarkData: String){
        setBookmarks((currentBookmark) => {
            if(currentBookmark.includes(bookmarkData)){
                return currentBookmark.filter((bookmark) => bookmark !== bookmarkData);
            }
            return [...bookmarks, bookmarks];
        });
    }

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    return (
        <BookmarkContext.Provider value={{bookmarks, toggleBookmarks}}>
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarkContext(){
    const context = useContext(BookmarkContext);
    if(!context) throw new Error("context was called outside of it's provider");
    return context;
}
