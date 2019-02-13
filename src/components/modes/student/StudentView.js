import React from 'react';
import PropTypes from 'prop-types';
import Viewer from '../../common/Viewer';
import Loader from '../../common/Loader';

export const StudentView = ({ model }) => {
  if (!model) {
    return <Loader />;
  }
  return <Viewer uid={model} />;
};

StudentView.propTypes = {
  model: PropTypes.string,
};

StudentView.defaultProps = {
  model: null,
};

export default StudentView;
