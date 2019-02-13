import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import Sketchfab from '@sketchfab/viewer-api/viewer-api';

class Viewer extends Component {
  static propTypes = {
    uid: PropTypes.string,
  };

  static defaultProps = {
    uid: null,
  };

  componentDidMount() {
    const { uid } = this.props;
    const iframe = document.getElementById('api-frame');
    const client = new Sketchfab('1.4.2', iframe);

    client.init(uid, {
      success: function onSuccess(api) {
        api.start();
        api.addEventListener('viewerready', () => {
          console.log('viewer is ready');
        });
        api.addEventListener('click', obj => console.log(obj));
        api.addEventListener('camerastart', () =>
          console.log('camera is moving')
        );
      },
      error: function onError() {
        console.log('viewer error');
      },
    });
  }

  render() {
    return (
      <Iframe
        url=""
        height="600px"
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
