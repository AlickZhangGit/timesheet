import SelectionArea from "@viselect/react";
import React, { useState } from "react";
import "../styles/Test.css";
export default function Test() {
    const [selected, setSelected] = useState(() => new Set());

    //Els is an array of elements
    const extractIds = (els) => {
        //get data keys from elements
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

    return (
        <SelectionArea
            className="container"
            onStart={onStart}
            onMove={onMove}
            selectables=".selectable"
        >
            {new Array(400).fill(0).map((_, index) => (
                <div
                    className={
                        selected.has(index)
                            ? "selected selectable"
                            : "selectable"
                    }
                    data-key={index}
                    key={index}
                />
            ))}
        </SelectionArea>
    );
}
