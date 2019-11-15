import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Loader from '../../common/Loader';
import Result from './Result';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    padding: theme.spacing(2),
    marginBottom: 100,
  },
  grid: {
    flexGrow: 1,
  },
});

// eslint-disable-next-line
class Results extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      ellipsis: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
      grid: PropTypes.string.isRequired,
    }).isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    preview: PropTypes.func.isRequired,
    activity: PropTypes.bool,
  };

  static defaultProps = {
    activity: false,
  };

  render() {
    const { classes, models, preview, activity } = this.props;

    if (activity) {
      return <Loader />;
    }

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} spacing={2} container>
          {models.map(props => {
            const {
              uid,
              name,
              description,
              thumbnails: { images = [] } = {},
            } = props;
            const imagesBySize = _.sortBy(images, 'size');
            const image = imagesBySize[images.length - 1].url;
            return (
              <Grid item xs={4} sm={4} md={3} lg={2} key={uid}>
                <Result
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
  }
}

const mapStateToProps = ({ models }) => ({
  activity: models.activity,
});

const ConnectedComponent = connect(mapStateToProps)(Results);

export default withStyles(styles)(ConnectedComponent);
