import React from "react";
import "components/DayListItem.scss"

import classNames from "classnames";

export default function DayListItem(props) {

  //conditionally renders spots on DayListItem based on passed props
  const formatSpots = function(props) {
    if (props.spots > 1) return `${props.spots} spots remaining`;
    if (props.spots === 1) return `${props.spots} spot remaining`;

    return `no spots remaining`
  };

  const dayClassName = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  return (
    <li className={dayClassName} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2>{props.name}</h2>
      {formatSpots(props)}
    </li>
  );
};
