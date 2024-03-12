import React from 'react';
import { useTranslation } from 'react-i18next';

import { Add } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardActionArea, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { RESULT_CARD_CY } from '../../../config/selectors';
import { Model } from '../../../types/models';

const StyledCard = styled(Card)<{ isSelected: boolean }>(
  ({ theme, isSelected }) =>
    isSelected
      ? {
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
        }
      : {},
);

const ExpandButton = styled(IconButton)<{ expanded: boolean }>(
  ({ theme, expanded }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
);

interface Props extends Omit<Model, 'thumbnails'> {
  image: string;
  preview: (uid: string) => void;
  isSelected: boolean;
}

const Result = ({
  name,
  uid,
  description,
  image,
  preview,
  isSelected,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard data-cy={RESULT_CARD_CY} isSelected={isSelected}>
      <Tooltip title={name}>
        <CardActionArea onClick={() => preview(uid)}>
          <CardMedia sx={{ height: 140 }} image={image} title={name} />
          <CardContent>
            <Typography variant="h6" component="h2" noWrap>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Tooltip>
      <CardActions disableSpacing>
        <Tooltip title={t('Preview')}>
          <IconButton aria-label="select" onClick={() => preview(uid)}>
            <Add />
          </IconButton>
        </Tooltip>
        <ExpandButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          expanded
        >
          <ExpandMoreIcon />
        </ExpandButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default Result;
