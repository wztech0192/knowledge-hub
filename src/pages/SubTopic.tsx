import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import {
  Breadcrumbs,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { NavLink, Path } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../assets/css/index.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;

const Topic = () => {
  const resizeObserverOptions = {};

  const maxWidth = 800;

  type PDFFile = string | File | null;

  const ctx = useRouteMetadataContext();
  const [file] = useState<PDFFile>(
    `${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`,
  );

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [path, setPath] = useState(ctx.getTopicPath());

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleTopicChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    setPath(event.target.value);
    
  };

  return (
    <div>
      <Typography variant="h3">Subject page</Typography>
      <Typography variant="subtitle1">
        Category:
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
          <NavLink to={ctx.getSubjectPath()}>Subjects</NavLink>
          <NavLink to={ctx.pathname}>{ctx.topic?.name}</NavLink>
        </Breadcrumbs>
        <div className="topic-controls">
          <FormControl fullWidth>
            <InputLabel id="topic-select-label">Topic</InputLabel>
            <Select
              labelId="topic-select-label"
              id="topic-select"
              value={path}
              label="Topic"
              onChange={handleTopicChange}>
              {ctx.topic?.subtopics?.map((subtopic, subIndex) =>(
                <MenuItem value={subtopic.name}>1</MenuItem>
              ))}
              {/* <MenuItem><NavLink to={ctx.pathname}>{ctx.getTopicPath()}</NavLink></MenuItem> */}
            </Select>
          </FormControl>
        </div>
      </Typography>
      <hr />
      <div className="pdf-container">
        {ctx.topic?.assetUrl && (
          // <Typography>Render PDF {ctx.topic?.assetUrl}</Typography>
          <div className="pdf-container-document" ref={setContainerRef}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              ))}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic;
