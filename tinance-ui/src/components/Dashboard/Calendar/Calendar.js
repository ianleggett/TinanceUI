import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

class Calendar extends Component {
    
    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true,
        calendarEvents: [
          // initial event data
            { title: "Event Now", start: new Date() }
        ]
    };

    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    };

    handleDateClick = arg => {
        if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
          this.setState({
            // add new event data
            calendarEvents: this.state.calendarEvents.concat({
              // creates a new array
              title: "New Event",
              start: arg.date,
              allDay: arg.allDay
            })
          });
        }
    };

    render() {
        return (
            <div className="dashboard-bg-gray dashboard" id="dashboard-calendar">
                {/* <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                    }}
                    plugins={[dayGridPlugin]}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    events={this.state.calendarEvents}
                    dateClick={this.handleDateClick}
                /> */}
                <div className="calendar">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        height="800px"
                        headerToolbar={{
                            left: "prev",
                            center: "title",
                            right: "today, next"
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Calendar;