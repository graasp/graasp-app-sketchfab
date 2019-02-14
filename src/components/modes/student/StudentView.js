import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Viewer from '../../common/Viewer';
import Loader from '../../common/Loader';
import ModelQrCode from '../../common/ModelQrCode';
import ModelNotConfigured from '../../common/ModelNotConfigured';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class StudentView extends Component {
  static propTypes = {
    model: PropTypes.string,
    activity: PropTypes.bool.isRequired,
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
    const { classes, model, activity } = this.props;
    const { value } = this.state;

    if (activity) {
      return <Loader />;
    }
    if (!model) {
      return <ModelNotConfigured />;
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

const mapStateToProps = ({ appInstance }) => ({
  activity: appInstance.activity,
});

const ConnectedComponent = connect(mapStateToProps)(StudentView);

export default withStyles(styles)(ConnectedComponent);
