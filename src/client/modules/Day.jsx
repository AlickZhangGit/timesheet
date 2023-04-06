import React from "react";
import { useState, useEffect } from "react";
import "../styles/Day.css";

export default function Day(props) {
  const [hourData, setHoursData] = useState(false);
  const [showHourDetails, setShowHourDetails] = useState(false);

  function handleCellDoubleClick(event) {
    setShowHourDetails(!showHourDetails);
    const { target } = event;
    const { offsetTop, offsetLeft } = target;
    const x = offsetLeft + target.offsetWidth / 2;
    const y = offsetTop + target.offsetHeight / 2;
    setModalPosition({ x, y });
    setIsOpen(true);
  }

  function dotdotdot(hours) {
    const stringed = String(hours);
    if (hours == null) setHoursData("");
    else if (stringed.length > 6) setHoursData("...");
    else setHoursData(stringed);
  }

  useEffect(() => {
    dotdotdot(props.dayObj.hours);
  }, [props.dayObj.hours]);

  return (
    <div
      className={props.className + " day"}
      data-key={props["data-key"]}
      id={"modal-root" + props["data-key"]}
      onDoubleClick={handleCellDoubleClick}
    >
      <div className="dayDate">{props.dayObj.date.getDate()}</div>

      <div className="hoursText">{hourData}</div>
      {hourData === "..." ? (
        <div className="hoursDetails bgcolor3">{props.dayObj.hours}</div>
      ) : (
        ""
      )}
    </div>
  );
}
