import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Topic = () => {
  const ctx = useRouteMetadataContext();
  return (
    <div>
      <Typography variant="h3">Subject page</Typography>
      <Button
        variant="contained"
        component={NavLink}
        to={ctx.getPreviousPath()}>
        Back
      </Button>
      <Typography variant="subtitle1">
        Category: <b>{ctx.category?.name}</b>
      </Typography>
      <Typography variant="subtitle1">
        Subject: <b>{ctx.subject?.title}</b>
      </Typography>
      <Typography variant="subtitle1">
        Topic: <b>{ctx.topic?.name}</b>
      </Typography>
      {ctx.topicHierarchy.length > 1 && (
        <Typography variant="subtitle1">
          Topic Hierarchy:{' '}
          <b>{ctx.topicHierarchy.map(t => t.name).join(' -> ')}</b>
        </Typography>
      )}
      <hr />
      {!!ctx.topic?.subtopics?.length && (
        <>
          <Typography variant="subtitle1">Subtopics:</Typography>

          <ol>
            {ctx.topic?.subtopics?.map((t, i) => (
              <li key={i}>
                <NavLink to={ctx.getNextPath(`${i}`)}>{t.name}</NavLink>
              </li>
            ))}
          </ol>
        </>
      )}

      {ctx.topic?.assetUrl && (
        <Typography>Render PDF {ctx.topic?.assetUrl}</Typography>
      )}
    </div>
  );
};

export default Topic;
