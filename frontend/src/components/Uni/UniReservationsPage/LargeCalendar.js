import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookies';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReservationPopUp from './ReservationPopUp';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

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

// const baseUrl = "https://knightsreserv-00cde8777914.herokuapp.com";
const baseUrl = "http://localhost:5000";

function LargeCalendar()
{
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [events, setEvents] = useState([]);
    
    // var RSOID = Cookies.get('RSOID');

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        open();
    };

    const formatEvents = (eventList) => {
        if (eventList === undefined) return;

        var events = new Set();

        eventList.forEach(event => {
            if (event.EventName === undefined)
            {
                console.log("Undefined");
            }
            else {
                var dateParts = event.Date.split('-');
                var month = parseInt(dateParts[0], 10);
                var day = parseInt(dateParts[1], 10);
                var year = parseInt(dateParts[2], 10);
                var start = event.StartEnd[0];
                var end = event.StartEnd[1];

                events.add(
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
                        room: event.RoomID, 
                        eventID: event.EventID
                    }
                );
            }
        });
        console.log(events);
        setEvents(events);
    };

    useEffect(() => {

        var data;
        
        const getEventList = async () =>
        {
            var obj = { RSOID:undefined };
            var js = JSON.stringify(obj);
            console.log(js);
            try
            {
                const response = await fetch(`${baseUrl}/api/RetrieveEvents`,
                {method:'POST',
                body:js,
                headers:{'Content-Type':'application/json'}});
                var res = await response.json();
                console.log(res.eventList);
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
            <Calendar className="LargeCalendar" id="LargeCalendar" localizer={localizer} events={events} startAccessor="start" endAccessor="end" views={['month', 'week', 'day']} onSelectEvent={handleEventClick}/>
            <Drawer opened={opened} onClose={close} position="right" overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}>
                {selectedEvent && (
                    <ReservationPopUp event={selectedEvent} />
                )}
            </Drawer>
        </div>
    );
}


export default LargeCalendar;