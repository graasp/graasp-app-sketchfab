import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Viewer from '../../common/Viewer';
import Loader from '../../common/Loader';
import ModelQrCode from '../../common/ModelQrCode';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class StudentView extends Component {
  static propTypes = {
    model: PropTypes.string,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    model: null,
  };

  state = {
    value: 0,
  };

  componentDidMount() {
    if (window.frameElement) {
      // 600 is the height of the viewer and 48 the height of the header
      window.frameElement.style.height = '648px';
      window.frameElement.style['max-height'] = 'none';
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, model } = this.props;
    const { value } = this.state;

    if (!model) {
      return <Loader />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Model" />
            <Tab label="QR Code" />
          </Tabs>
        </AppBar>
        {value === 0 && <Viewer uid={model} autoStart={false} />}
        {value === 1 && <ModelQrCode uid={model} />}
      </div>
    );
  }
}

export default withStyles(styles)(StudentView);
