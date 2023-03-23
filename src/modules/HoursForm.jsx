import { useState } from "react";

export default function HoursForm({ selectedDays, setUserData }) {
  //Takes an array of days?

  const handleSubmit = (event) => {
    event.preventDefault();
    const arr = [];
    const els = event.target;
    for (let i = 0; i < els.length - 1; i++) {
      const day = event.target[i].getAttribute("data-key");
      const hours = event.target[i].value;
      arr.push({ day, hours });
    }
    console.log(
      "You submitted your hours! the array of dates and hours looks like"
    );
    console.table(arr);
    setUserData(arr);
  };

  return (
    <div>
      Enter Hours Here
      <form onSubmit={handleSubmit}>
        <div>
          {selectedDays.map((day) => {
            return <DayEntry day={day} />;
          })}
          <br />
        </div>
        <input type="submit" value="OK" />
      </form>
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
  console.log("Im rerendering a day entry ", date);

  const handleChange = (event) => {
    setHours(event.target.value);
  };

  return (
    <label>
      {date.toLocaleDateString(undefined, options)}
      <input
        type="text"
        value={hours}
        onChange={handleChange}
        data-key={date.toLocaleDateString(undefined, options)}
      />{" "}
      Hours
    </label>
  );
}
