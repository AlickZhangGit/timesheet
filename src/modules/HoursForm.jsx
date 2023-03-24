import { useState } from "react";
import userService from "../services/userService";
import "../styles/HoursForm.css";

export default function HoursForm({ selectedDays, closeModal }) {
  //Takes an array of days (just ids of dates, they need to be cast as Dates)

  const [userData, setUserData] = useState();
  //Userdata is an array of days... {}

  const handleSubmit = (event) => {
    event.preventDefault();
    const arr = [];
    const els = event.target;
    for (let i = 0; i < els.length - 1; i++) {
      const date = new Date(event.target[i].getAttribute("data-key"));
      const hours = event.target[i].value;
      arr.push({ date, hours });
    }
    console.log(
      "You submitted your hours! the array of dates and hours looks like"
    );
    console.table(arr);
    userService.postUserData(arr);
    closeModal();
  };

  const runGetData = () => {
    const date = new Date();
    userService.getDataForMonth(date);
  };

  return (
    <div className="hoursForm">
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          {selectedDays.map((day) => {
            return <DayEntry day={day} />;
          })}
        </div>
        <br />
        <input className="submitButton" type="submit" value="Submit" />
      </form>
      <button onClick={runGetData}>TEST</button>
    </div>
  );
}

function DayEntry({ day }) {
  const [hours, setHours] = useState("");
  const date = new Date(day);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  //console.log("Im rerendering a day entry ", date);

  const handleChange = (event) => {
    setHours(event.target.value);
  };

  return (
    <label className="formEntry">
      <div className="formDate">
        {date.toLocaleDateString(undefined, options)}
      </div>
      <input
        type="text"
        value={hours}
        onChange={handleChange}
        data-key={date.toLocaleDateString(undefined, options)}
      />{" "}
    </label>
  );
}
