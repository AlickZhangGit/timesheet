import "../styles/Day.css";

export default function Day(props) {
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
      {props.date.getDate()}
      <div>{getHours(props.date, props.userData)}hrs</div>
    </div>
  );
}

//props.userData is an array of..
function getHours(day, userData) {
  console.log("DA: ", day.toString());
  console.log("UD: ", userData);
  const match = userData.find((element) => {
    return (
      element.date.getDate() === day.getDate() &&
      element.date.getMonth() === day.getMonth() &&
      element.date.getFullYear() === day.getFullYear()
    );
    //console.log("||||||||||");
    //console.log("UD: ", element.date.toString());
    //console.log("DA: ", day.toString());
    //console.log(day.getTime() - element.date.getTime());
    //console.log("||||||||||");
    return element.date === day;
  });
  if (match) {
    console.log("match found", match);
    return match.hours;
  } else {
    console.log("match not found");
  }
  //console.log("match hours", match.hours);
}
