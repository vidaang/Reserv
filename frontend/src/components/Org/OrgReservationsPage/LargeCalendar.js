import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookies';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReservationPopUp from './ReservationPopUp';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

const locales = {
    "en-US" : require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales
});

var eventList = [];
var events = [];
// const events = [
//     {
//         title: "General Body Meeting",
//         allDay: false,
//         date: new Date(2023, 9, 20),
//         start: new Date(2023, 9, 20, 9, 0, 0),
//         end: new Date(2023, 9, 20, 10, 0, 0),
//         room: "CB2 101" 
//     },
//     {
//         title: "Tournament",
//         allDay: false,
//         date: new Date(2023, 9, 22),
//         start: new Date(2023, 9, 22, 8, 0, 0),
//         end: new Date(2023, 9, 22, 17, 0, 0),
//         room: "Pegasus Ball Room" 
//     }
// ]

function LargeCalendar()
{
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [event, setEvents] = useState([]);
    const [fetchEvent, setFetchEvent] = useState(true);
    
    // var RSOID = Cookies.get('RSOID');
    var RSOID = '65440e752b48c68af9b7c5c0';

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        open();
    };

    const formatEvents = (eventList) => {
        if (eventList == undefined) return;

        eventList.forEach(event => {
            
            var dateParts = event.Date.split('-');
            var month = parseInt(dateParts[0], 10);
            var day = parseInt(dateParts[1], 10);
            var year = parseInt(dateParts[2], 10);
            var start = event.StartEnd[0];
            var end = event.StartEnd[1];

            events.push(
                {
                    id: event.EventID,
                    title: event.EventName,
                    allDay: false,
                    date: new Date(year, month - 1, day),
                    start: new Date(year, month - 1, day, start, 0, 0),
                    end: new Date(year, month - 1, day, end, 0, 0),
                    eventType: event.EventType,
                    numAttendees: event.NumAttendees,
                    description: event.Description,
                    atriumOccupy: event.AtriumOccupy,
                    atriumBuilding: event.AtriumBuilding,
                    room: event.RoomID 
                }
            );
        });
        
        setEvents(events);
    };

    useEffect(() => {

        var data;
        
        const getEventList = async () =>
        {
            if (!RSOID)
            {
                return;
            }

            var obj = { RSOID:RSOID };
            var js = JSON.stringify(obj);
            console.log(js);
            try
            {
                const response = await fetch('http://localhost:5000/api/RetrieveEvents',
                {method:'POST',
                body:js,
                headers:{'Content-Type':'application/json'}});
                var res = await response.json();
                return res.eventList;
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }
        };
    
        const fetchEventData = async () => {
            
            data = await getEventList();
            formatEvents(data);          
        };

        fetchEventData();

    }, []);

    

    return (
        <div id="CalendarDiv">
            <Calendar id="LargeCalendar" localizer={localizer} events={events} startAccessor="start" endAccessor="end" views={['month', 'week', 'day']} onSelectEvent={handleEventClick}/>
            <Drawer opened={opened} onClose={close} position="right" overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}>
                {selectedEvent && (
                    <ReservationPopUp event={selectedEvent} />
                )}
            </Drawer>
        </div>
    );
}


export default LargeCalendar;