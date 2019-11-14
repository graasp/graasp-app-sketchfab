import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Loader from '../../common/Loader';

const styles = () => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.75,
    },
  },
});

// eslint-disable-next-line
class Results extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      clickable: PropTypes.string.isRequired,
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
        <GridList cellHeight={160} cols={3}>
          {models.map(({ uid, name, thumbnails: { images = [] } = {} }) => {
            const imagesBySize = _.sortBy(images, 'size');
            const image = imagesBySize[images.length - 1].url;
            return (
              <GridListTile
                key={uid}
                cols={1}
                onClick={() => preview(uid)}
                className={classes.clickable}
              >
                <img src={image} alt={name} />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = ({ models }) => ({
  activity: models.activity,
});

const ConnectedComponent = connect(mapStateToProps)(Results);

export default withStyles(styles)(ConnectedComponent);
