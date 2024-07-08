import { useMetadata } from '@/providers/MetadataContextProvider';
import { Autocomplete, InputAdornment, styled, TextField } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

interface OptionObject {
  path: string;
  label: string;
}

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'inherit',

  // vertical padding + font size from searchIcon
  // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
}));

export const SearchBar = () => {
  const metadata = useMetadata();
  const navigate = useNavigate();
  const options = useMemo<OptionObject[]>(() => {
    const result: OptionObject[] = [];

    metadata.categories.forEach(item => {
      item.subjects.forEach((subjectTitle, subjectTitleId) => {
        result.push({ path: '/', label: subjectTitle.title });
        subjectTitle.topics.forEach((topic, topicId) => {
          const topicPath = `/category/${subjectTitleId}/subject/${subjectTitleId}/topic/${topicId}`;
          const topicLabel = subjectTitle.title + '/' + topic.name;
          result.push({
            path: topicPath,
            label: topicLabel,
          });
          topic.subtopics?.forEach((subtopic, subtopicId) => {
            result.push({
              path: `${topicPath}/${subtopicId}`,
              label: topicLabel + '/' + subtopic.name,
            });
          });
        });
      });
    });
    return result;
  }, [metadata]);

  return (
    <div>
      <Autocomplete
        value={null}
        blurOnSelect
        fullWidth
        options={options}
        getOptionLabel={option => option.label}
        renderInput={params => (
          <StyledTextField
            {...params}
            margin="none"
            placeholder="Search any Topic"
            minRows="2"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon sx={{color: "white"}}/>
                </InputAdornment>
              )
            }
            }
            />
        )}
        onChange={(_, option) => {
          if (option) {
            navigate(option.path);
          }
        }}
      />
    </div>
  );
};
