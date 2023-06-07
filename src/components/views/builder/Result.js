import PropTypes from 'prop-types';
import React from 'react';

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

const StyledCard = styled(Card)(({ theme, isSelected }) =>
  isSelected
    ? {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
      }
    : {}
);

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
}));

function Result({ name, uid, description, image, preview, isSelected }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
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
        <Tooltip title="Preview">
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
}

Result.propTypes = {
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  preview: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Result;
