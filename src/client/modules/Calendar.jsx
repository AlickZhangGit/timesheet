import React from "react";
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
  dayIndex.setDate(1);
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
      setDaysArr(await daysHelper(new Date()));
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

  const enterHoursHandler = () => {
    if (selected.size === 0) {
      return;
    }

    setSelectedDays(Array.from(selected));
    setIsOpen(true);
  };

  const updateDaysArr = async () => {
    setDaysArr(await daysHelper(calDate));
  };

  return (
    <div id="calendarPage">
      <Navbar />
      <div className="calendar shadowed bgcolor3 textcolor1">
        <div className="calendarTop">
          <button
            onClick={() => {
              monthNav(-1);
            }}
            className="lrbutton bgcolor2"
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
            <button
              id="monthButton"
              className="calButton bgcolor2"
              onClick={toggle}
            >
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
            className="lrbutton bgcolor2"
          >
            {"⇒"}
          </button>
        </div>
        <div className="weekDays">
          <div id="sunday" className="dayOfWeek bgcolor1">
            Sunday
          </div>
          <div className="dayOfWeek bgcolor1">Monday</div>
          <div className="dayOfWeek bgcolor1">Tuesday</div>
          <div className="dayOfWeek bgcolor1">Wednesday</div>
          <div className="dayOfWeek bgcolor1">Thursday</div>
          <div className="dayOfWeek bgcolor1">Friday</div>
          <div id="saturday" className="dayOfWeek bgcolor1">
            Saturday
          </div>
        </div>
        <SelectionArea
          className="calContainer bgcolor1"
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
      <button
        className={
          selected.size > 0
            ? "onButton bgcolor3 textcolor1"
            : "offButton bgcolor3 textcolor2"
        }
        onClick={enterHoursHandler}
      >
        Enter Hours
      </button>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="Form Modal"
        ariaHideApp={false}
        className="Modal bgcolor3 textcolor1"
        overlayClassName="Overlay"
      >
        <div className="spreadWrapper">
          <h1>Enter Hours</h1>
          <button className="closeButton bgcolor3" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="divider"></div>
        <HoursForm
          selectedDays={selectedDays}
          closeModal={closeModal}
          updateDaysArr={updateDaysArr}
        />
      </Modal>
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
    return "future bgcolor1";
  }
  //Switch with above
  if (dayObj.selectable === false) {
    return "unselectable bgcolor1";
  }
  //-------------
  if (selected.has(dayObj.date.getTime())) {
    return "selected selectable";
  } else {
    return "selectable bgcolor3";
  }
}
