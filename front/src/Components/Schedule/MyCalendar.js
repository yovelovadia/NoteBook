import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

import "./main.scss";

function MyCalendar() {
  const calendarComponentRef = React.createRef();
  const [events, setEvent] = useState([
    { title: "test nigger", start: new Date(), end: "2020-05-28" },
  ]);

  const handleDateClick = (info) => {
    const eventName = window.prompt("event name", "");
    console.log(eventName);
    if (eventName) {
      console.log(info);

      const data = {
        email: "yovel78910@gmail.com",
        events: { title: eventName, start: info.date, allDay: info.allDay },
      };
      axios
        .post("http://localhost:5000/schedule/add", data)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

      // setEvent([
      //   ...events,
      //   { title: eventName, start: info.date, allDay: info.allDay },
      // ]);
    }
  };

  const handleSelectClick = (info) => {
    const eventName = window.prompt("event ffffff name", "");
    if (eventName) {
      // setEvent([
      //   ...events,
      //   {
      //     title: eventName,
      //     start: info.date,
      //     end: info.date,
      //     allDay: info.allDay,
      //   },
      // ]);
    }
  };

  return (
    <div className={"schedule background_images"}>
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            contentHeight={650}
            nowIndicator={true}
            selectable={true}
            selectMirror={true}
            selectMinDistance={2}
            selectMirror={true}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            events={events}
            dateClick={handleDateClick}
            select={handleSelectClick}
          />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
