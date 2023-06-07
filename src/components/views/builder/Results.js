import { List } from 'immutable';
import PropTypes from 'prop-types';

import { Loader } from '@graasp/ui';

import { Grid } from '@mui/material';

import Result from './Result';

const Results = ({ models, isLoading, preview, selectedModel }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} p={2} container>
      {models?.map((props) => {
        const { uid, name, description, thumbnails } = props;
        const imagesBySize = thumbnails.images.sortBy((image) => image.size);
        const image = imagesBySize.get(thumbnails.images.size - 1).url;
        return (
          <Grid item xs={4} sm={4} md={3} lg={2} key={uid}>
            <Result
              isSelected={selectedModel === uid}
              uid={uid}
              name={name}
              description={description}
              image={image}
              preview={preview}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

Results.propTypes = {
  models: PropTypes.instanceOf(List),
  preview: PropTypes.func.isRequired,
  selectedModel: PropTypes.string,
};

Results.defaultProps = {
  models: List(),
  selectedModel: null,
};

export default Results;
