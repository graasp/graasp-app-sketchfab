/* eslint-disable no-console */
import React, { useEffect } from 'react';
import Sketchfab from '@sketchfab/viewer-api';
import Iframe from 'react-iframe';

import { VIEWER_ID } from '../../config/selectors';
import { SKETCHFAB_VERSION } from '../../config/settings';

interface Props {
  uid: string;
  autoStart?: boolean;
  saveAction: () => void;
  height?: string;
}
const Viewer = ({
  uid,
  autoStart = true,
  saveAction,
  height = '600px',
}: Props): JSX.Element => {
  useEffect(() => {
    const iframe = document.getElementById(VIEWER_ID);
    const client = new Sketchfab(SKETCHFAB_VERSION, iframe);

    client.init(uid, {
      success: (api: any) => {
        if (autoStart) {
          api.start();
        }
        api.addEventListener('viewerready', () => {
          console.log('viewer is ready');
          saveAction?.();
        });
        api.addEventListener('click', (obj: object) => console.log(obj));
        api.addEventListener('camerastart', () =>
          console.log('camera is moving'),
        );
      },
      error: () => {
        console.log('viewer error');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, uid]);
  return (
    <Iframe
      url=""
      frameBorder={0}
      height={height}
      width="100%"
      id={VIEWER_ID}
      allow="autoplay; fullscreen; vr"
      // allowvr
      // allowfullscreen
      // mozallowfullscreen
      // webkitallowfullscreen
    />
  );
};

export default Viewer;
