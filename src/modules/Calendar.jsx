import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import Modal from "react-modal";
import SelectionArea from "@viselect/react";
import Day from "./Day";
import DateInput from "./DateInput";
import HoursForm from "./HoursForm";
import "../styles/Calendar.css";

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

async function initializeUserData() {
  const initDate = new Date();
  return await userService.getDataForMonth(initDate);
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
  //Calendar UI variables
  const [calDate, setCalDate] = useState(initializeDate()); //Current Calendar month?
  const [daysArr, setDaysArr] = useState(initializeDaysArr());
  const [selected, setSelected] = useState(() => new Set());
  const [dateinputVisiblity, setDateinputVisiblity] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  //Hours data is an array of objects that look like...
  //{day: example-3/21/23}

  const [userData, setUserData] = useState([]); //initializeUserData()

  const navigate = useNavigate();
  const checkAuth = async (credentials) => {
    try {
      const response = await userService.checkAuthentication(credentials);
      if (response.status != 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log("calendar checkauth err", err);
    }
  };

  useEffect(async () => {
    checkAuth();
    setUserData(await initializeUserData());
  }, []);

  const toggle = () => {
    setDateinputVisiblity(!dateinputVisiblity);
  };

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

  const monthNav = async (int) => {
    const newmonth = Number(calDate.getMonth()) + int;
    //Get userdata...
    setUserData(
      await userService.getDataForMonth(
        new Date(calDate.getFullYear(), newmonth, 1)
      )
    );
    setCalDate(new Date(calDate.getFullYear(), newmonth, 1));
    setDaysArr(daysHelper(new Date(calDate.getFullYear(), newmonth, 1)));
  };

  const setDateHandler = async (year, month) => {
    const newDate = new Date(year, month, 1);
    setUserData(await userService.getDataForMonth(newDate)); //userService.getDataForMonth(initDate)
    setCalDate(newDate);
    setDaysArr(daysHelper(newDate));
  };

  const updateHoursHandlerForm = () => {
    setSelectedDays(Array.from(selected));
    setIsOpen(true);
  };

  console.log("Pringint userdata", userData);

  return (
    <div id="calendarWrapper">
      <div className="navbar">
        <div className="topnav-left-active">
          <a href="/calendar">Calendar</a>
        </div>
        <div className="topnav-left">
          <a href="/calendar">Other1</a>
        </div>
        <div className="topnav-left">
          <a href="/calendar">Other2</a>
        </div>
        <div className="topnav-right">
          <a href="/api/v1/logout">Logout</a>
        </div>
      </div>

      <div className="calendarMain">
        <div className="calendar">
          <div className="calendarNavigator">
            <div className="calendarNav">
              <button
                onClick={() => {
                  monthNav(-1);
                }}
              >
                {"<"}
              </button>
              <div id="dateSelection">
                {dateinputVisiblity ? (
                  <DateInput
                    date={calDate}
                    setDateHandler={setDateHandler}
                    toggle={toggle}
                  />
                ) : (
                  <button id="monthName" onClick={toggle}>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                    }).format(calDate)}
                  </button>
                )}
              </div>
              <button
                style={{ float: "right" }}
                onClick={() => {
                  monthNav(1);
                }}
              >
                {">"}
              </button>
            </div>
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
                  className={dayClassNames(day, selected, calDate)}
                  date={day}
                  key={day.getTime()}
                  data-key={day.getTime()}
                  userData={userData}
                />
              );
            })}
          </SelectionArea>
        </div>
      </div>
      <button onClick={updateHoursHandlerForm}>Enter Hours</button>
      <div>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="Modal"
        >
          <button className="closeButton" onClick={closeModal}>
            X
          </button>
          <HoursForm selectedDays={selectedDays} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
}

function dayClassNames(day, selected, calDate) {
  //selected, selectable, in month range
  //unselectable, out of month range
  const className = "";
  //Switch this block with the one below it depending on shader preference
  const today = new Date();
  if (day > today) {
    return "future";
  }
  //Switch with above
  if (day.getMonth() !== calDate.getMonth()) {
    return "unselectable";
  }
  //-------------
  if (selected.has(day.getTime())) {
    return "selected selectable";
  } else {
    return "selectable";
  }
}
