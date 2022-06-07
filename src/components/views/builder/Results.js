import { List } from 'immutable';
import sortBy from 'lodash.sortby';
import PropTypes from 'prop-types';
import React from 'react';

import { Loader } from '@graasp/ui';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Result from './Result';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    padding: theme.spacing(2),
    marginBottom: 100,
  },
  grid: {
    flexGrow: 1,
  },
}));

const Results = ({ models, isLoading, preview, selectedModel }) => {
  const classes = useStyles();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} spacing={2} container>
        {models?.map((props) => {
          const {
            uid,
            name,
            description,
            thumbnails: { images = [] } = {},
          } = props;
          const imagesBySize = sortBy(images, 'size');
          const image = imagesBySize[images.length - 1].url;
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
    </div>
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
