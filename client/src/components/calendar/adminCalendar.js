import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import "../twelve_column_grid.css"

const locales = {
    "en-CA": require("date-fns/locale/en-CA"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// const dummyEvents = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2023, 10, 0),
//         end: new Date(2023, 10, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2023, 10, 7),
//         end: new Date(2023, 10, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2023, 10, 20),
//         end: new Date(2023, 10, 23),
//     },
// ];

export default function EventsCalendar() {
  const[buttonPopup, setButtonPopup] = useState(false);
   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <div className='row'>
        <div className="col-12 col-s-12 centered-div">
          <h1>PULS Events Calendar</h1>
          <div className="add-event-container">
            <input  type="text"
                    placeholder="Event time and title"
                    style={{ width: "20%", margin: "10px" }}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value})}
            />
            <DatePicker placeholderText="Start Date" 
                        selected={newEvent.start}
                        style={{ width: "100px", margin: "10px" }}
                        onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
          </div>
          <div>
            <button className='button-add' onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-s-12">
          <Calendar localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="start"
                    style={{ height: 500, margin: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}
