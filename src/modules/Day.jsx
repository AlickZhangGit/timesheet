import "../styles/Day.css";

export default function Day(props) {
  /*props.dayObj looks like
  {
    date: date    //always
    hours: string //(if any), can be empty string..?
    selectable: bool
    selected: bool
  }
  */
  //takes a number as a prop
  //console.log(props["data-key"]);

  //const getHours = () => {};

  return (
    <div
      className={props.className + " day"}
      data-key={props["data-key"]}
      style={{
        display: "inline-block",
      }}
    >
      {props.dayObj.date.getDate()}
      <div>{props.dayObj.hours ? props.dayObj.hours : ""}</div>
    </div>
  );
}
