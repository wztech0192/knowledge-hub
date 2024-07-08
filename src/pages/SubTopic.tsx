import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Breadcrumbs, FormControl, MenuItem, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../assets/css/index.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;

const Topic = () => {
  const navigate = useNavigate();
  const resizeObserverOptions = {};

  const maxWidth = 800;

  const ctx = useRouteMetadataContext();

  const currentTopicId = ctx.topicIds?.at(-1)?.toString(); // get current topic id
  const parentTopic = ctx.topicHierarchy?.at(-2); // get parent topic

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleSubTopicChange = (event: SelectChangeEvent) => {
    navigate(`${ctx.getPreviousPath()}/${event.target.value}`);
  };

  const handleTopicChange = (event: SelectChangeEvent) => {
    navigate(`${ctx.getSubjectPath()}/topic/${event.target.value}`);
  };

  return (
    <div>
      {!!ctx.topic?.subtopics?.length && (
        <>
          <Typography variant="subtitle1">
            <b>Category:</b>
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink to="/">Home</NavLink>
              <NavLink to={ctx.getSubjectPath()}>Subjects</NavLink>
              <FormControl size="small">
                <Select
                  labelId="topic-select-label"
                  id="topic-select"
                  value={currentTopicId ?? ''}
                  onChange={handleTopicChange}>
                  {ctx.subject?.topics.map((topic, topicId) => (
                    <MenuItem key={topicId} value={topicId}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Breadcrumbs>
          </Typography>
          <hr />
          <Carousel>
            {ctx.topicHierarchy
              .at(0)
              ?.subtopics?.map((subtopic, subtopicId) => (
                <Paper
                  key={subtopicId}
                  style={{
                    height: '500px',
                    width: '50%',
                    margin: '0 auto',
                    backgroundColor: '#FFA38F',
                    borderRadius: '60px',
                  }}>
                  <h1 style={{display: 'flex',
                    justifyContent: 'center'}}
                    key={subtopicId}>{subtopic.name}</h1>
                </Paper>
              ))}
          </Carousel>
        </>
      )}
      {ctx.topicHierarchy.length > 1 && (
        <>
          <Typography variant="h3">{parentTopic?.name}</Typography>
          <Typography variant="subtitle1">
            Category:
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink to="/">Home</NavLink>
              <NavLink to={ctx.getSubjectPath()}>Subjects</NavLink>
              <FormControl size="small">
                <Select
                  labelId="topic-select-label"
                  id="topic-select"
                  value={currentTopicId ?? ''}
                  onChange={handleSubTopicChange}>
                  {parentTopic?.subtopics?.map((subtopic, topicId) => (
                    <MenuItem key={topicId} value={topicId}>
                      {subtopic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Breadcrumbs>
          </Typography>
          <hr />
          <div className="pdf-container">
            {ctx.topic?.assetUrl && (
              // <Typography>Render PDF {ctx.topic?.assetUrl}</Typography>
              <div className="pdf-container-document" ref={setContainerRef}>
                <Document
                  file={`${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (_, index) => (
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
        </>
      )}
    </div>
  );
};

export default Topic;
