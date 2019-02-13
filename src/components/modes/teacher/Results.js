import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

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
    classes: PropTypes.shape({}).isRequired,
    models: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    preview: PropTypes.func.isRequired,
  };

  render() {
    const { classes, models, preview } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={160} cols={3}>
          {models.map(({ uid, name, thumbnails: { images } = {} }) => (
            <GridListTile
              key={uid}
              cols={1}
              onClick={() => preview(uid)}
              className={classes.clickable}
            >
              <img src={images[0].url} alt={name} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Results);
