import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../assets/css/index.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;

const Topic = () => {
  const resizeObserverOptions = {};

  const maxWidth = 800;

  type PDFFile = string | File | null;


  const ctx = useRouteMetadataContext();
  const [file, setFile] = useState<PDFFile>(
    `${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`,
  );

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function pageForward() {
    if (typeof numPages === 'number' && pageNumber >= numPages) {
      return;
    } else {
      setPageNumber(pageNumber + 1);
    }
  }

  function pageBackward() {
    if (typeof numPages === 'number' && pageNumber <= 1) {
      return;
    }

    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function topicForward(){
    //logic for topic forward
    // <NavLink to={ctx.getNextPath(`topic/${ctx.subjectId}/${ctx.subjectId + 1}`)} />

  }

  function topicBackward(){
    
  }

  return (
    <div>
      <Typography variant="h3">Subject page</Typography>
      <Typography variant="subtitle1">
        Category:
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
          <NavLink to="http://localhost:5173/category/0/subject/0">
            Subjects
          </NavLink>
          <NavLink to={ctx.pathname}>{ctx.topic?.name}</NavLink>
        </Breadcrumbs>
        <div className='topic-controls'>
          <Button onClick={topicBackward}>{'<'}</Button>
          <div className="page-controls">
            <Button onClick={pageBackward}>{'<'}</Button>
            <span>{ctx.topic?.name}</span>
            <Button onClick={pageForward}>{'>'}</Button>
          </div>
          <Button onClick={topicForward}>{'>'}</Button>
        </div>
      </Typography>
      <hr />
      <div className="pdf-container">
        {ctx.topic?.assetUrl && (
          // <Typography>Render PDF {ctx.topic?.assetUrl}</Typography>
          <div className="pdf-container-document" ref={setContainerRef}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                className="fonts"
                pageNumber={pageNumber}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic;
