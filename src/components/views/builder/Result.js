import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { CardActionArea, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  media: {
    height: 140,
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  isSelected: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

function Result({ name, uid, description, image, preview, isSelected }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={clsx(classes.card, { [classes.isSelected]: isSelected })}>
      <Tooltip title={name}>
        <CardActionArea onClick={() => preview(uid)}>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              className={classes.ellipsis}
            >
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
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
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
