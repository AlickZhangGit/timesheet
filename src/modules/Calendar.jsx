import { useState } from "react";
import "../styles/Calendar.css";
import Day from "./Day";
import SelectionArea from "@viselect/react";
import DateInput from "./DateInput";

function initializeDate() {
  const initDate = new Date(); //Get current date
  initDate.setDate(1); //Set it to the first of the month
  return initDate;
}

function initializeDaysArr() {
  const initDate = new Date(); //Get current date
  initDate.setDate(1); //Set it to the first of the month
  return daysHelper(initDate);
}

function daysHelper(date) {
  //Given a Date object, create and return an array of the calendar (dates)
  //that would display the 42 days
  let dayIndex = new Date(date);
  const arr = [];
  //back up to the nearest sunday
  while (dayIndex.getDay() !== 0) {
    dayIndex.setDate(dayIndex.getDate() - 1);
  }

  for (let i = 0; i < 42; i++) {
    const newDate = new Date(dayIndex);
    arr.push(newDate);
    dayIndex.setDate(dayIndex.getDate() + 1);
  }

  return arr;
}

export default function Calendar(props) {
  const [calDate, setCalDate] = useState(initializeDate()); //Current Calendar month?
  const [daysArr, setDaysArr] = useState(initializeDaysArr());
  const [selected, setSelected] = useState(() => new Set());

  const extractIds = (els) => {
    return els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);
  };

  const onStart = ({ event, selection }) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }) => {
    setSelected((prev) => {
      const next = new Set(prev);

      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  const monthNav = (int) => {
    const newmonth = Number(calDate.getMonth()) + int;
    setCalDate(new Date(calDate.getFullYear(), newmonth, 1));
    setDaysArr(daysHelper(new Date(calDate.getFullYear(), newmonth, 1)));
  };

  const setDateHandler = (year, month) => {
    const newDate = new Date(year, month, 1);
    setCalDate(newDate);
    setDaysArr(daysHelper(newDate));
  };

  return (
    <div className="calendar">
      <div className="calendarNavigator">
        <button
          onClick={() => {
            monthNav(-1);
          }}
        >
          {"<"}
        </button>
        <div id="dateSelection">
          <DateInput date={calDate} setDateHandler={setDateHandler} />
          <button id="monthName">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
            }).format(calDate)}
          </button>
        </div>
        <button
          onClick={() => {
            monthNav(1);
          }}
        >
          {">"}
        </button>
      </div>
      <SelectionArea
        className="container1"
        onStart={onStart}
        onMove={onMove}
        selectables=".selectable"
      >
        {daysArr.map((day) => {
          return (
            <Day
              className={
                selected.has(day.getTime())
                  ? "selected selectable"
                  : "selectable"
              }
              date={day}
              key={day.getTime()}
              data-key={day.getTime()}
            />
          );
        })}
      </SelectionArea>
    </div>
  );
}
