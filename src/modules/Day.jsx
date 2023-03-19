import "../styles/Day.css";

export default function Day(props) {
    //takes a number as a prop
    //console.log(props["data-key"]);
    return (
        <div className={props.className + " day"} data-key={props["data-key"]}>
            {props.date.getDate()}
        </div>
    );
}
