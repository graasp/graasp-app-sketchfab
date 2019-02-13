import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from '../../common/Viewer';
import Loader from '../../common/Loader';

class StudentView extends Component {
  static propTypes = {
    model: PropTypes.string,
  };

  static defaultProps = {
    model: null,
  };

  componentDidMount() {
    if (window.frameElement) {
      window.frameElement.style.height = '600px';
    }
  }

  render() {
    const { model } = this.props;
    if (!model) {
      return <Loader />;
    }
    return <Viewer uid={model} />;
  }
}

export default StudentView;
