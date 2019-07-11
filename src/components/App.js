import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TeacherView from './modes/teacher/TeacherView';
import StudentView from './modes/student/StudentView';
import './App.css';
import { getContext } from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE } from '../config/settings';
import { getAppInstance } from '../actions/appInstance';
import Loader from './common/Loader';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    dispatchGetContext: PropTypes.func.isRequired,
    dispatchGetAppInstance: PropTypes.func.isRequired,
    model: PropTypes.string,
    lang: PropTypes.string,
    mode: PropTypes.string,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
    model: null,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the context
    props.dispatchGetContext();
    // then get the app instance
    props.dispatchGetAppInstance();
  }

  async componentDidMount() {
    const { lang } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
  }

  async componentDidUpdate({ lang: prevLang }) {
    const { lang } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
  }

  handleChangeLang = lang => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode, model } = this.props;

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case 'teacher':
      case 'producer':
      case 'educator':
      case 'admin':
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case 'student':
      case 'consumer':
      case 'learner':
        return <StudentView model={model} />;

      default:
        return <Loader />;
    }
  }
}

const mapStateToProps = ({ context, appInstance }) => {
  let model = null;
  if (appInstance.content && appInstance.content.settings) {
    ({ model } = appInstance.content.settings);
  }

  return {
    lang: context.lang,
    mode: context.mode,
    userId: context.userId,
    appInstanceId: context.appInstanceId,
    model,
  };
};

const mapDispatchToProps = {
  dispatchGetContext: getContext,
  dispatchGetAppInstance: getAppInstance,
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withTranslation()(ConnectedApp);
