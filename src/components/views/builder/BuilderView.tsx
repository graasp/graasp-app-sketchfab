import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Add } from '@mui/icons-material';
import { Modal, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

import { useModelsSearch, useSettings } from '../../../config/hooks';
import { SELECT_BUTTON_CY } from '../../../config/selectors';
import Settings from '../../common/Settings';
import Viewer from '../../common/Viewer';
import Results from './Results';
import SearchForm from './SearchForm';
import { DEFAULT_QUERY } from '../../../config/settings';

const Wrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '75%',
  height: '75%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  outline: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  position: 'absolute',
  top: '50%',
  right: '0',
  transform: 'translate(0, -50%)',
}));

const BuilderView = (): JSX.Element => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>(DEFAULT_QUERY);
  const [selected, setSelected] = useState<string | null>(null);
  const { data: models, isLoading } = useModelsSearch({ q: search });
  const { saveModel, model } = useSettings();

  const handleOpen = (modelUid: string): void => {
    setOpen(true);
    setSelected(modelUid);
  };

  const handleClose = (): void => {
    setOpen(false);
    setSelected(null);
  };

  const onSelectModel = (): void => {
    if (selected) {
      saveModel({ data: { model: selected } });
      handleClose();
    }
  };

  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />
      <Results
        models={models}
        preview={handleOpen}
        selectedModel={model}
        isLoading={isLoading}
      />
      <Modal
        aria-labelledby="Preview Model"
        aria-describedby="Preview a Sketchfab model to use in your application."
        open={open}
        onClose={handleClose}
      >
        <Wrapper>
          {selected && (
            <Viewer uid={selected} autoStart={false} height="100%" />
          )}
          <Tooltip title={t('Select Model')}>
            <StyledFab
              data-cy={SELECT_BUTTON_CY}
              aria-label="Select"
              onClick={onSelectModel}
              color="primary"
            >
              <Add />
            </StyledFab>
          </Tooltip>
        </Wrapper>
      </Modal>
      <Settings />
    </>
  );
};

export default BuilderView;
