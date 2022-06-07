import React, { useState } from 'react';

import { Modal, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import { useModels, useSettings } from '../../../config/hooks';
import Settings from '../../common/Settings';
import Viewer from '../../common/Viewer';
import Results from './Results';
import SearchForm from './SearchForm';

const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    right: '0',
    transform: 'translate(0, -50%)',
  },
}));

const BuilderView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [selected, setSelected] = useState(null);
  const { data: models } = useModels({ q: search });
  const { saveModel, model } = useSettings();

  const handleOpen = (newSelected) => {
    setOpen(true);
    setSelected(newSelected);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const onSelectModel = async () => {
    saveModel({ data: { model: selected } });
    handleClose();
  };

  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />
      <Results models={models} preview={handleOpen} selectedModel={model} />
      <Modal
        aria-labelledby="Preview Model"
        aria-describedby="Preview a Sketchfab model to use in your application."
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Viewer uid={selected} autoStart={false} height="100%" />
          <Tooltip title="Select Model">
            <Fab
              aria-label="Select"
              className={classes.fab}
              onClick={onSelectModel}
              color="primary"
            >
              <Add />
            </Fab>
          </Tooltip>
        </div>
      </Modal>
      <Settings />
    </>
  );
};

export default BuilderView;
