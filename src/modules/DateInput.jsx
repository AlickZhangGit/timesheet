import { useState } from "react";

export default function DateInput(props) {
  const [month, setMonth] = useState(props.date.getMonth());
  const [year, setYear] = useState(props.date.getFullYear());

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setDateHandler(year, month);
  };

  const changeMonthHandler = (event) => {
    setMonth(event.target.value);
  };
  const changeYearHandler = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="month">
          <select
            id="monthSelector"
            name="monthSelector"
            value={month}
            onChange={changeMonthHandler}
          >
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </label>
        <label htmlFor="year">
          <select
            id="yearSelector"
            name="yearSelector"
            value={year}
            onChange={changeYearHandler}
          >
            {yearList(new Date().getFullYear())}
          </select>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

function yearList(year) {
  //Return ONLY the past 10 years as selectable:
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(
      <option value={year - i} key={year - i}>
        {year - i}
      </option>
    );
  }
  return arr;
}
