import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import './TeacherView.css';
import { patchAppInstance, getModels, selectModel } from '../../../actions';
import Results from './Results';
import Viewer from '../../common/Viewer';
import SearchForm from './SearchForm';
import { DEFAULT_QUERY } from '../../../config/settings';
import Settings from '../../common/Settings';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '75%',
    height: '75%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export class TeacherView extends Component {
  static propTypes = {
    // todo: remove when instructions are added
    // eslint-disable-next-line
    t: PropTypes.func.isRequired,
    dispatchGetModels: PropTypes.func.isRequired,
    dispatchSelectModel: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    selected: null,
  };

  constructor(props) {
    super(props);
    const { dispatchGetModels } = this.props;
    dispatchGetModels({ q: DEFAULT_QUERY });
  }

  handleOpen = selected => {
    this.setState({ open: true, selected });
  };

  handleClose = () => {
    this.setState({ open: false, selected: null });
  };

  selectModel = async () => {
    const { dispatchSelectModel } = this.props;
    const { selected } = this.state;
    await dispatchSelectModel({ data: { model: selected } });
    this.handleClose();
  };

  render() {
    // extract properties from the props object
    const { models, classes } = this.props;
    const { open, selected } = this.state;

    return (
      <Container fluid className="App App-body TeacherView">
        <SearchForm />
        <Results models={models} preview={this.handleOpen} />
        <Modal
          aria-labelledby="Preview Model"
          aria-describedby="Preview a Sketchfab model to use in your application."
          open={open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Viewer uid={selected} autoStart={false} height="100%" />
            <Fab
              variant="extended"
              aria-label="Select"
              className={classes.fab}
              onClick={this.selectModel}
            >
              Select Model
            </Fab>
          </div>
        </Modal>
        <Settings />
      </Container>
    );
  }
}

TeacherView.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
  classes: PropTypes.shape({}).isRequired,
};

TeacherView.defaultProps = {
  models: [],
};

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ models }) => ({
  models: models.content.results,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchPatchAppInstance: patchAppInstance,
  dispatchGetModels: getModels,
  dispatchSelectModel: selectModel,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherView);

export default withTranslation()(withStyles(styles)(ConnectedComponent));
