import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { BreadCrumbs } from './Subject';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '@/assets/css/index.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useBookmarkContext } from '@/providers/BookmarksContextProvider';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;


//Typography element and then drill down the prop to the child component through the parent component.

const Topic = () => {
  const navigate = useNavigate();
  const { toggleBookmarks } = useBookmarkContext();
  const resizeObserverOptions = {};
  const location = useLocation();
  const maxWidth = 1024;

  const ctx = useRouteMetadataContext();

  const currentTopicId = ctx.topicIds?.at(-1)?.toString(); // get current topic id
  const parentTopic = ctx.topicHierarchy?.at(-2); // get parent topic

  const [numPages, setNumPages] = useState<number>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const path = `${location.pathname}`;

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    const scrollEvent = () => {
      // throttling and deboucning
      // use debouncing for this
      localStorage.setItem(
        `knowledge_hub_${path}_scrollPosition`,
        JSON.stringify(window.scrollY),
      );
    };
    window.document.addEventListener('scroll', scrollEvent);
    return () => {
      window.document.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  useResizeObserver(containerRef.current, resizeObserverOptions, onResize);

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
            <BreadCrumbs aria-label="breadcrumb">
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
            </BreadCrumbs>
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
                  }}>
                  <h1 key={subtopicId}>{subtopic.name}</h1>
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
            <BreadCrumbs aria-label="breadcrumb">
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
            </BreadCrumbs>
          </Typography>
          <hr />
          <Box ref={containerRef}>
            {ctx.topic?.assetUrl && (
              <Document
                file={`${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (_, index) => (
                  <React.Fragment key={index}>
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={
                        containerWidth
                          ? Math.min(containerWidth, maxWidth)
                          : maxWidth
                      }
                      className="page-wrapper"
                      onRenderSuccess={() => {
                        const lastScrolledPosition = parseInt(
                          localStorage.getItem(
                            `knowledge_hub_${path}_scrollPosition`,
                          ) ?? '',
                        );

                        if (lastScrolledPosition) {
                          window.scrollTo({
                            top: lastScrolledPosition,
                          });
                        }
                      }}>
                      <IconButton
                        id={`page_${index + 1}`}
                        size="small"
                        key={index}
                        onClick={() => {
                          // check if book is already toggled.
                          toggleBookmarks({
                            name: `${ctx.topic?.name} - Page ${index + 1}`,
                            topic: ctx.topic?.name ?? '',
                            pageNumber: index + 1,
                            path: location.pathname,
                          });
                        }}
                        sx={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 2,
                        }}>
                        <StarBorderIcon />
                      </IconButton>
                      <Divider />
                    </Page>
                  </React.Fragment>
                ))}
              </Document>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default Topic;
