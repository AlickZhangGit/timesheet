import { useState } from "react";
import "../styles/Calendar.css";
import Day from "./Day";

import SelectionArea from "@viselect/react";

//The calendar module takes a month and a year? as props to initialize?
export default function Calendar(props) {
    const date = new Date(props.year, props.month, 1);
    const days = daysHelper(date);

    const [selected, setSelected] = useState(() => new Set());

    const extractIds = (els) => {
        console.log(
            "els.map is ",
            els.map((v) => v.getAttribute("data-key"))
        );
        console.log(
            "els.map,filter is ",
            els.map((v) => v.getAttribute("data-key")).filter(Boolean)
        );
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

    console.log(selected);

    return (
        <div className="calendar">
            <div id="monthName">Month {props.month}</div>
            <SelectionArea
                className="container1"
                onStart={onStart}
                onMove={onMove}
                selectables=".selectable"
            >
                {days.map((day) => {
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

function daysHelper(date) {
    //Given a Date object, create and return an array of the calendar (dates)
    //that would display the 42 days
    date.getDay();
    let dayIndex = date;

    //back up to the nearest sunday
    while (dayIndex.getDay() !== 0) {
        dayIndex.setDate(dayIndex.getDate() - 1);
    }

    const arr = [];

    for (let i = 0; i < 42; i++) {
        const newDate = new Date(dayIndex);
        arr.push(newDate);
        dayIndex.setDate(dayIndex.getDate() + 1);
    }

    return arr;
}

function temp() {
    return (
        <div id="daysWrapper">
            {days.map((day) => {
                return (
                    <Day
                        date={day}
                        key={day.getTime()}
                        data-key={day.getTime()}
                    />
                );
            })}
        </div>
    );
}
