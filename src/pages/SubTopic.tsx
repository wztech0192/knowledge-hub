import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;

console.log(pdfjs.GlobalWorkerOptions.workerSrc);
const Topic = () => {
  const ctx = useRouteMetadataContext();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

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
          <Document
            file={`${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`}
            onLoadSuccess={onDocumentLoadSuccess}>
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
