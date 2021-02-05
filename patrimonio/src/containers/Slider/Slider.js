import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 40,
  },
  {
    value: 60,
  },
  {
    value: 80,
  },
  {
    value: 100,
  },
];

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 8,
    padding: '10px 100px',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -103,
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 2,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    marginLeft: -103,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 5,
    marginLeft: -200,
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 3,
    marginTop: -3,
    marginLeft: -103,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
        marks={marks}
      />
    </div>
  );
}
