import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// console.log(import.meta.env);

const Topic = () => {
  const ctx = useRouteMetadataContext();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/legacy/build/pdf.worker.min.js',
  //   import.meta.url,
  // ).toString();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
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
      </Typography>
      <hr />
      {ctx.topic?.assetUrl && (
        // <Typography>Render PDF {ctx.topic?.assetUrl}</Typography>
        <div>
          <Document file={ctx.topic?.assetUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default Topic;
