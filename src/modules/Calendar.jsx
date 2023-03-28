import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import Modal from "react-modal";
import SelectionArea from "@viselect/react";
import Day from "./Day";
import DateInput from "./DateInput";
import HoursForm from "./HoursForm";
import Navbar from "./Navbar";
import "../styles/Calendar.css";

async function daysHelper(calDate) {
  //Days array is built from userdata maybe?
  /*{
    date
    hrs text (if any)
    selectable: true/false
    selected: true/false
  }*/
  //Build a new 42 days with userdata populated in it
  let dayIndex = new Date(calDate);
  const arr = [];
  const today = new Date();
  let userData = [];
  try {
    userData = await userService.getDataForMonth(calDate);
  } catch (error) {}
  //const userData = await userService.getDataForMonth(calDate);
  //back up to the nearest sunday
  while (dayIndex.getDay() !== 0) {
    dayIndex.setDate(dayIndex.getDate() - 1);
  }

  for (let i = 0; i < 42; i++) {
    const newDate = new Date(dayIndex);
    //future or wrong month
    if (dayIndex > today || dayIndex.getMonth() !== calDate.getMonth()) {
      const dayObj = { date: newDate, selectable: false };
      arr.push(dayObj);
      dayIndex.setDate(dayIndex.getDate() + 1);
      continue;
    }

    //Is there info of dayIndex in userdata?
    const match = userData.find((element) => {
      return (
        element.date.getDate() === dayIndex.getDate() &&
        element.date.getMonth() === dayIndex.getMonth() &&
        element.date.getFullYear() === dayIndex.getFullYear()
      );
    });
    //if so, return an object with the data in it
    if (match) {
      //console.log("Match found: ", match);
      const dayObj = {
        date: newDate,
        selectable: true,
        selected: false,
        hours: match.hours,
      };
      arr.push(dayObj);
      dayIndex.setDate(dayIndex.getDate() + 1);
      continue;
    }
    //else return a blank selectable day
    else {
      //console.log("Match not found");
      const dayObj = {
        date: newDate,
        selectable: true,
        selected: false,
      };
      arr.push(dayObj);
      dayIndex.setDate(dayIndex.getDate() + 1);
      continue;
    }
  }
  return arr;
}

export default function Calendar(props) {
  const [calDate, setCalDate] = useState(initializeDate()); //A date used for calendar month

  const [dateinputVisiblity, setDateinputVisiblity] = useState(false);
  const [daysArr, setDaysArr] = useState([]);

  const [selected, setSelected] = useState(() => new Set());
  const [selectedDays, setSelectedDays] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  //const [userData, setUserData] = useState([]); //initializeUserData()

  useEffect(() => {
    async function init() {
      checkAuth();
      //setUserData(await initializeUserData());
      setDaysArr(await daysHelper(new Date(2023, 2, 1)));
    }
    init();
  }, []);

  const navigate = useNavigate();
  const checkAuth = async (credentials) => {
    try {
      const response = await userService.checkAuthentication(credentials);
      if (response.status != 200) {
        //navigate("/login"); //Comment to test in vite
      }
    } catch (err) {
      console.log("calendar checkauth err", err);
    }
  };

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
    //Update internal calendar month AND days displayed
    setCalDate(new Date(calDate.getFullYear(), newmonth, 1));
    setDaysArr(await daysHelper(new Date(calDate.getFullYear(), newmonth, 1)));
  };

  const setDateHandler = async (year, month) => {
    const newDate = new Date(year, month, 1);
    //Update internal calendar month AND days displayed
    setCalDate(newDate);
    setDaysArr(await daysHelper(newDate));
  };

  const updateHoursHandlerForm = () => {
    setSelectedDays(Array.from(selected));
    setIsOpen(true);
  };

  const updateDaysArr = async () => {
    setDaysArr(await daysHelper(calDate));
  };

  return (
    <div id="calendarPage">
      <Navbar />
      <div className="calendar shadowed">
        <div className="calendarTop">
          <button
            onClick={() => {
              monthNav(-1);
            }}
            className="calButton"
          >
            {"⇐"}
          </button>
          {dateinputVisiblity ? (
            <DateInput
              date={calDate}
              setDateHandler={setDateHandler}
              toggle={toggle}
            />
          ) : (
            <button id="monthButton" className="calButton" onClick={toggle}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
              }).format(calDate)}
            </button>
          )}
          <button
            onClick={() => {
              monthNav(1);
            }}
            className="calButton"
          >
            {"⇒"}
          </button>
        </div>
        <div className="weekDays">
          <div id="sunday" className="dayOfWeek">
            Sunday
          </div>
          <div className="dayOfWeek">Monday</div>
          <div className="dayOfWeek">Tuesday</div>
          <div className="dayOfWeek">Wednesday</div>
          <div className="dayOfWeek">Thursday</div>
          <div className="dayOfWeek">Friday</div>
          <div id="saturday" className="dayOfWeek">
            Saturday
          </div>
        </div>
        <SelectionArea
          className="container1"
          onStart={onStart}
          onMove={onMove}
          selectables=".selectable"
        >
          {daysArr.map((dayObj) => {
            return (
              <Day
                className={dayClassNames(dayObj, selected)}
                key={dayObj.date.getTime()}
                data-key={dayObj.date.getTime()}
                dayObj={dayObj}
              />
            );
          })}
        </SelectionArea>
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
          <HoursForm
            selectedDays={selectedDays}
            closeModal={closeModal}
            updateDaysArr={updateDaysArr}
          />
        </Modal>
      </div>
    </div>
  );
}

function initializeDate() {
  const initDate = new Date(); //Get current date
  initDate.setDate(1); //Set it to the first of the month
  return initDate;
}

function dayClassNames(dayObj, selected) {
  //Switch this block with the one below it depending on shader preference
  const today = new Date();
  if (dayObj.date > today) {
    return "future";
  }
  //Switch with above
  if (dayObj.selectable === false) {
    return "unselectable";
  }
  //-------------
  if (selected.has(dayObj.date.getTime())) {
    return "selected selectable";
  } else {
    return "selectable";
  }
}

/*
async function initializeUserData() {
  const initDate = new Date();
  return await userService.getDataForMonth(initDate);
}
*/

/*
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
*/
