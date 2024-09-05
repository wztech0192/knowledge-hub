import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { BreadCrumbs } from './Subject';
import styled from '@emotion/styled';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '@/assets/css/index.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';

pdfjs.GlobalWorkerOptions.workerSrc = `${
  import.meta.env.BASE_URL
}pdf.worker.min.js`;

const StyledBoxComponent = styled(Box)(() => ({
  overflow: 'scroll',
  height: '100vh',
}));

//Typography element and then drill down the prop to the child component through the parent component.

const Topic = () => {
  const navigate = useNavigate();
  const resizeObserverOptions = {};

  const maxWidth = 800;

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
    containerRef.current?.addEventListener('scroll', () => {
      localStorage.setItem(
        `knowledge_hub_${path}_scrollPosition`,
        JSON.stringify(containerRef.current?.scrollTop),
      );
    });

    return () => {
      containerRef.current?.removeEventListener('scroll', () => {
        localStorage.setItem(
          `knowledge_hub_${path}_scrollPosition`,
          JSON.stringify(containerRef.current?.scrollTop),
        );
      });
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
          <StyledBoxComponent ref={containerRef}>
            {ctx.topic?.assetUrl && (
              <Document
                file={`${import.meta.env.BASE_URL}${ctx.topic?.assetUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (_, index) => (
                  <>
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
                        const lastScrolledPosition = localStorage.getItem(
                          `knowledge_hub_${path}_scrollPosition`,
                        );
                        if (lastScrolledPosition) {
                          containerRef.current?.scrollTo(
                            0,
                            parseInt(lastScrolledPosition),
                          );
                          containerRef.current?.scrollIntoView({
                            block: 'start',
                          });
                        }
                      }}
                      canvasBackground="#FEF3E2">
                      <IconButton
                        id={`page_${index + 1}`}
                        size="small"
                        sx={{ position: 'absolute', top: '0', right: '0' }}>
                        <StarBorderIcon />
                      </IconButton>
                    </Page>
                  </>
                ))}
              </Document>
            )}
          </StyledBoxComponent>
        </>
      )}
    </div>
  );
};

export default Topic;
