import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import Sketchfab from '@sketchfab/viewer-api/viewer-api';

class Viewer extends Component {
  static propTypes = {
    uid: PropTypes.string,
    autoStart: PropTypes.bool,
    height: PropTypes.string,
  };

  static defaultProps = {
    uid: null,
    autoStart: true,
    height: '600px',
  };

  componentDidMount() {
    const { uid, autoStart } = this.props;
    const iframe = document.getElementById('api-frame');
    const client = new Sketchfab('1.4.2', iframe);

    client.init(uid, {
      success: api => {
        if (autoStart) {
          api.start();
        }
        api.addEventListener('viewerready', () => {
          console.log('viewer is ready');
        });
        api.addEventListener('click', obj => console.log(obj));
        api.addEventListener('camerastart', () =>
          console.log('camera is moving')
        );
      },
      error: () => {
        console.log('viewer error');
      },
    });
  }

  render() {
    const { height } = this.props;
    return (
      <Iframe
        url=""
        height={height}
        id="api-frame"
        allow="autoplay; fullscreen; vr"
        allowvr
        allowfullscreen
        mozallowfullscreen
        webkitallowfullscreen
      />
    );
  }
}

export default Viewer;
