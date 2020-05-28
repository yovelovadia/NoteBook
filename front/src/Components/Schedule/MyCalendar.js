import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listGridPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useSelector } from "react-redux";
import "./main.scss";

function MyCalendar() {
  const Logged = useSelector((state) => state.Logged.whoLogged);
  const calendarComponentRef = React.createRef();
  const [events, setEvent] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // happens at start and refresh... load from DB and set up
    const empty_array = [];
    async function getData() {
      const data = await axios.get("http://localhost:5000/schedule/getDates", {
        params: { Logged },
      });
      data.data.map((date) => {
        empty_array.push({
          title: date.date.title,
          start: date.date.start,
          end: date.date.end,
          allDay: date.date.allDay,
          userId: date._id,
          id: date._id,
        });
        return null;
      });
    }

    getData()
      .then(() => {
        setEvent(empty_array);
      })
      .catch((error) => console.log(error));
  }, [refresh, Logged]);

  const handleDateClick = (info) => {
    //creating new date
    const eventName = window.prompt("event name", "");
    if (eventName) {
      const data = {
        token: `bearer ${localStorage.jwtAuthToken}`,
        _id: Logged,
        events: {
          title: eventName,
          start: info.date,
          end: info.end,
          allDay: info.allDay,
        },
      };
      axios
        .post("http://localhost:5000/schedule/add", { params: data })
        .then((res) => setRefresh(refresh + 1))
        .catch((e) => console.log(e.response));
    }
  };

  const handleEventMove = (info) => {
    //changing event spot
    const data = {
      id: info.oldEvent.id,
      events: {
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        allDay: info.event.allDay,
      },
    };
    axios
      .put("http://localhost:5000/schedule/change-position", data)
      .catch((e) => console.log(e));
  };

  const handleEventResize = (info) => {
    //changing event spot
    const data = {
      id: info.prevEvent.id,
      events: {
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        allDay: info.event.allDay,
      },
    };
    axios
      .put("http://localhost:5000/schedule/change-resize", data)
      .catch((e) => console.log(e));
  };

  function handleEventDelete(info) {
    if (window.confirm("Delete event?")) {
      const id = info.event.id;
      axios
        .delete(`http://localhost:5000/schedule/${id}`)
        .then((res) => setRefresh(refresh + 1))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className={"schedule background_images"}>
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            contentHeight={700}
            handleWindowResize={true}
            nowIndicator={true}
            selectMinDistance={2}
            editable={true}
            eventLimit={2}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
            eventBackgroundColor={"rgba(179, 229, 245, 0.788)"}
            eventBorderColor={"black"}
            eventTextColor={"black"}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listGridPlugin,
            ]}
            ref={calendarComponentRef}
            events={events}
            dateClick={handleDateClick}
            eventDrop={handleEventMove}
            eventResize={handleEventResize}
            eventClick={handleEventDelete}
          />
        </div>
      </div>
      {!Logged ? (
        <h1>
          <a className={"loginError"} href={"/log-in"}>
            Must login for making changes
          </a>
        </h1>
      ) : null}
      <div style={{ bottom: "0" }} className={"logo"}>
        <a href={"/home"}>NoteBook</a>
      </div>
    </div>
  );
}

export default MyCalendar;
