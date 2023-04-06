import React from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar bgcolor3 textcolor1">
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
  );
}
