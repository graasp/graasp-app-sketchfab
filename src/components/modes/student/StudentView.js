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
import NoContentAvailable from '../../common/NoContentAvailable';

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
    showQrCode: PropTypes.bool.isRequired,
    showModel: PropTypes.bool.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    model: null,
  };

  state = {
    activeTabIndex: 0,
  };

  componentDidMount() {
    if (window.frameElement) {
      // 600 is the height of the viewer and 48 the height of the header
      window.frameElement.style.height = '648px';
      window.frameElement.style['max-height'] = 'none';
    }
  }

  handleChange = (event, value) => {
    this.setState({ activeTabIndex: value });
  };

  renderTabs = () => {
    const { showQrCode, showModel } = this.props;
    const tabs = [];
    if (showModel) {
      tabs.push(<Tab label="Model" key="model" />);
    }
    if (showQrCode) {
      tabs.push(<Tab label="QR Code" key="qrCode" />);
    }
    return tabs;
  };

  render() {
    const { classes, model, activity, showQrCode, showModel } = this.props;
    const { activeTabIndex } = this.state;

    if (activity) {
      return <Loader />;
    }
    if (!model) {
      return <ModelNotConfigured />;
    }
    if (!showModel && !showQrCode) {
      return <NoContentAvailable />;
    }

    const panels = [];
    if (showModel) {
      panels.push(<Viewer uid={model} autoStart={false} key="model" />);
    }
    if (showQrCode) {
      panels.push(<ModelQrCode uid={model} key="qrCode" />);
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs value={activeTabIndex} onChange={this.handleChange}>
            {this.renderTabs()}
          </Tabs>
        </AppBar>
        {panels[activeTabIndex]}
      </div>
    );
  }
}

const mapStateToProps = ({ appInstance }) => {
  // only override defaults if they have actually been defined in the settings
  let showQrCode = true;
  let showModel = true;
  if (appInstance.content && appInstance.content.settings) {
    if (typeof appInstance.content.settings.showQrCode !== 'undefined') {
      ({ showQrCode } = appInstance.content.settings);
    }
    if (typeof appInstance.content.settings.showModel !== 'undefined') {
      ({ showModel } = appInstance.content.settings);
    }
  }
  return {
    showQrCode,
    showModel,
    activity: appInstance.activity,
  };
};

const ConnectedComponent = connect(mapStateToProps)(StudentView);

export default withStyles(styles)(ConnectedComponent);
