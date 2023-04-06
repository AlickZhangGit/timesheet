import React from "react";
import { useState, useEffect } from "react";
import "../styles/Day.css";

export default function Day(props) {
  const [hourData, setHoursData] = useState(false);

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
