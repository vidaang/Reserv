import React, { useState } from 'react';
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

const events = [ // Change to Reservation
    {
        title: "General Body Meeting",
        allDay: false,
        date: new Date(2023, 9, 20),
        start: new Date(2023, 9, 20, 9, 0, 0),
        end: new Date(2023, 9, 20, 10, 0, 0),
        room: "CB2 101" 
    },
    {
        title: "Tournament",
        allDay: false,
        date: new Date(2023, 9, 22),
        start: new Date(2023, 9, 22, 8, 0, 0),
        end: new Date(2023, 9, 22, 17, 0, 0),
        room: "Pegasus Ball Room" 
    }
]

const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales
});

function LargeCalendar(props)
{
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        open();
    };

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