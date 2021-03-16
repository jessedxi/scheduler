import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const className = classNames({
    "interviewers__item": true,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  })

  return(
  <li className={className} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.selected? props.name : ""} 
</li>
  );
}