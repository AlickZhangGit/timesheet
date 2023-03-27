import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../styles/Day.css";

export default function Day(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const [hourData, setHoursData] = useState("");

  function handleCellDoubleClick(event) {
    const { target } = event;
    const { offsetTop, offsetLeft } = target;
    const x = offsetLeft + target.offsetWidth / 2;
    const y = offsetTop + target.offsetHeight / 2;
    setModalPosition({ x, y });
    setIsOpen(true);
  }

  function dotdotdot(hours) {
    const stringed = String(hours);
    if (hours == null) setHoursData("");
    else if (stringed.length > 4) setHoursData("...");
    else if (stringed.length > 0) setHoursData(stringed);
    else setHoursData("");
  }

  useEffect(() => {
    dotdotdot(props.dayObj.hours);
  }, [props.dayObj.hours]);

  return (
    <div
      className={props.className + " day"}
      data-key={props["data-key"]}
      style={{
        display: "inline-block",
      }}
      id={"modal-root" + props["data-key"]}
      onDoubleClick={handleCellDoubleClick}
    >
      {props.dayObj.date.getDate()}

      <div>
        {hourData}
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          ariaHideApp={false}
          onRequestClose={closeModal}
          parentSelector={() =>
            document.querySelector("#modal-root" + props["data-key"])
          }
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "transparent",
              zIndex: 9999,
            },
            content: {
              position: "relative",
              height: "150px",
              width: "150px",
              top: modalPosition.y - 250,
              left: modalPosition.x - 95,
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
              overflow: "auto",
              padding: "20px",
              zIndex: 10000,
            },
          }}
        >
          <div>{props.dayObj.hours ? props.dayObj.hours : ""}</div>
        </Modal>
      </div>
    </div>
  );
}
