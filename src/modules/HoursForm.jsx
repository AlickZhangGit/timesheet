import { useEffect, useState } from "react";
import userService from "../services/userService";
import "../styles/HoursForm.css";

export default function HoursForm({ selectedDays, closeModal, updateDaysArr }) {
  const [errmessage, setErrMessage] = useState("");
  const [linkAllInput, setLinkAllInput] = useState(false);
  const [linkedVal, setLinkedVal] = useState("");
  //Takes an array of days (just ids of dates, they need to be cast as Dates)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const arr = [];
    const els = event.target;
    for (let i = 0; i < els.length - 1; i++) {
      const date = new Date(event.target[i].getAttribute("data-key"));
      const hours = event.target[i].value;
      if (hours === "") {
        setErrMessage("Please fill in all fields");
        return;
      }

      arr.push({ date, hours });
    }
    console.log(
      "You submitted your hours! the array of dates and hours looks like"
    );
    console.table(arr);
    await userService.postUserData(arr);
    await updateDaysArr();
    closeModal();
  };

  const handleCheckboxChange = (event) => {
    setLinkAllInput(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit} className="hoursForm">
      <label htmlFor="linkCheckbox">
        Edit all fields:
        <input
          id="linkCheckbox"
          type="checkbox"
          checked={linkAllInput}
          onChange={handleCheckboxChange}
        />
      </label>
      {selectedDays.map((day) => {
        console.log(day);
        return (
          <DayEntry
            day={day}
            key={day}
            linkedVal={linkedVal}
            setLinkedVal={setLinkedVal}
            linkAllInput={linkAllInput}
          />
        );
      })}

      {errmessage === "" ? "" : <div className="errorMsg">{errmessage}</div>}
      <input
        id="hoursSubmit"
        className="darkButton"
        type="submit"
        value="Submit"
      />
    </form>
  );
}

function DayEntry({ day, linkedVal, setLinkedVal, linkAllInput }) {
  const [hours, setHours] = useState(linkedVal);
  const date = new Date(day);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  //console.log("Im rerendering a day entry ", date);

  const handleChange = (event) => {
    if (linkAllInput) {
      console.log("Wa");
      setLinkedVal(event.target.value);
    }
    setHours(event.target.value);
  };

  return (
    <label className="formEntry">
      <div className="formEntryDate">
        {date.toLocaleDateString(undefined, options)}
      </div>
      <input
        className="formEntryInput"
        type="text"
        value={hours}
        onChange={handleChange}
        data-key={date.toLocaleDateString(undefined, options)}
      />{" "}
    </label>
  );
}
