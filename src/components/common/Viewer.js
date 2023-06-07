import Sketchfab from '@sketchfab/viewer-api/viewer-api';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Iframe from 'react-iframe';

import { VIEWER_ID } from '../../config/selectors';
import { SKETCHFAB_VERSION } from '../../config/settings';

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
    const iframe = document.getElementById(VIEWER_ID);
    const client = new Sketchfab(SKETCHFAB_VERSION, iframe);

    client.init(uid, {
      success: (api) => {
        if (autoStart) {
          api.start();
        }
        api.addEventListener('viewerready', () => {
          console.log('viewer is ready');
        });
        api.addEventListener('click', (obj) => console.log(obj));
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
        frameBorder={0}
        height={height}
        width="100%"
        id={VIEWER_ID}
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
