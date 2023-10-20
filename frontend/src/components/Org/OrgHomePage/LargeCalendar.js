import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const locales = {
    "en-US" : require("date-fns/locale/en-US")
};

const events = [ // Change to Reservation
    {
        title: "General Body Meeting",
        allDay: false,
        start: new Date(2023, 9, 20),
        end: new Date(2023, 9, 20)
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
    const view = props.view;
    return (
        <Calendar id="LargeCalendar" localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
    );
}


export default LargeCalendar;