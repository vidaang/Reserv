import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../../services/api_service.dart';
import '../../services/jwt_token.dart';

import 'utils.dart';

class ReservationsCalendar extends StatefulWidget {
  const ReservationsCalendar({super.key});

  @override
  _ReservationsCalendarState createState() => _ReservationsCalendarState();
}

class _ReservationsCalendarState extends State<ReservationsCalendar> {
  late final ValueNotifier<List<Event>> _selectedEvents;
  CalendarFormat _calendarFormat = CalendarFormat.month;
  RangeSelectionMode _rangeSelectionMode = RangeSelectionMode
      .toggledOff; // Can be toggled on/off by longpressing a date
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  DateTime? _rangeStart;
  DateTime? _rangeEnd;

  @override
  void initState() {
    super.initState();
    clearEventSource();
    fetchEvents();
    _selectedDay = _focusedDay;
    _selectedEvents = ValueNotifier(_getEventsForDay(_selectedDay!));
  }

  @override
  void dispose() {
    _selectedEvents.dispose();
    super.dispose();
  }

  List<Event> _getEventsForDay(DateTime day) {
    // Implementation example
    return kEvents[day] ?? [];
  }

  List<Event> _getEventsForRange(DateTime start, DateTime end) {
    // Implementation example
    final days = daysInRange(start, end);

    return [
      for (final d in days) ..._getEventsForDay(d),
    ];
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      setState(() {
        _selectedDay = selectedDay;
        _focusedDay = focusedDay;
        _rangeStart = null; // Important to clean those
        _rangeEnd = null;
        _rangeSelectionMode = RangeSelectionMode.toggledOff;
      });

      _selectedEvents.value = _getEventsForDay(selectedDay);
    }
  }

  void _onRangeSelected(DateTime? start, DateTime? end, DateTime focusedDay) {
    setState(() {
      _selectedDay = null;
      _focusedDay = focusedDay;
      _rangeStart = start;
      _rangeEnd = end;
      _rangeSelectionMode = RangeSelectionMode.toggledOn;
    });

    // `start` or `end` could be null
    if (start != null && end != null) {
      _selectedEvents.value = _getEventsForRange(start, end);
    } else if (start != null) {
      _selectedEvents.value = _getEventsForDay(start);
    } else if (end != null) {
      _selectedEvents.value = _getEventsForDay(end);
    }
  }

  Future<void>  deleteEvent(Event event) async{
    final eventIDToDelete =  event.eventID.toString();
    kEvents.remove(event.calendarDate);
    await ApiService.deleteEvent(eventIDToDelete);
    clearEventSource();
    await fetchEvents();
    setState(() {});
    setState(() {
        _selectedDay = DateTime.now();
        _focusedDay = DateTime.now();
        _rangeStart = null; // Important to clean those
        _rangeEnd = null;
        _rangeSelectionMode = RangeSelectionMode.toggledOff;
      });
    _selectedEvents.value = _getEventsForDay(DateTime.now());
  }

  void _showEventDetailsDialog(Event event) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Event Details'),
          content: Text(event.toString()), // You can customize this to display event details as needed
          actions: <Widget>[
            TextButton(
              child: const Text('Edit'),
              onPressed: () {
                _showEditDialog(event);
              },
            ),
            TextButton(
              child: const Text('Delete'),
              onPressed: () {
                _showDeleteDialog(event);
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _showEditDialog(Event event) {
  // Implement the edit dialog here
  showDialog(
    context: context,
    builder: (context) {
      // Your edit dialog widget goes here
      return AlertDialog(
        title: const Text('Edit Event'),
        content: const Text('Edit'),
        actions: <Widget>[
          TextButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.of(context).pop();
              },
          ),
        ],
      );
    },
  );
}

void _showDeleteDialog(Event event) {
  // Implement the delete dialog here
  showDialog(
    context: context,
    builder: (context) {
      // Your delete dialog widget goes here
      return AlertDialog(
        title: const Text('Delete Event'),
        content: const Text('Are you sure you want to cancel this reservation?'),
        actions: <Widget>[
          TextButton(
              child: const Text('Back'),
              onPressed: () {
                Navigator.of(context).pop();
              },
          ),
          TextButton(
              child: const Text('Confirm'),
              onPressed: () {
                deleteEvent(event);
                Navigator.of(context).pop();
              },
            ),
        ],
      );
    },
  );
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF0E9D3),
      body: Column(
        children: [
          TableCalendar<Event>(
            firstDay: kFirstDay,
            lastDay: kLastDay,
            focusedDay: _focusedDay,
            selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
            rangeStartDay: _rangeStart,
            rangeEndDay: _rangeEnd,
            calendarFormat: _calendarFormat,
            rangeSelectionMode: _rangeSelectionMode,
            eventLoader: _getEventsForDay,
            startingDayOfWeek: StartingDayOfWeek.monday, // Can change start day
            calendarStyle: const CalendarStyle(
              outsideDaysVisible: true,
            ),
            onDaySelected: _onDaySelected,
            onRangeSelected: _onRangeSelected,
            onFormatChanged: (format) {
              if (_calendarFormat != format) {
                setState(() {
                  _calendarFormat = format;
                });
              }
            },
            onPageChanged: (focusedDay) {
              _focusedDay = focusedDay;
            },
          ),
          const SizedBox(height: 8.0),
          Expanded(
            child: ValueListenableBuilder<List<Event>>(
              valueListenable: _selectedEvents,
              builder: (context, value, _) {
                return ListView.builder(
                  itemCount: value.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 12.0,
                        vertical: 4.0,
                      ),
                      decoration: BoxDecoration(
                        border: Border.all(),
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      child: ListTile(
                        onTap: () => _showEventDetailsDialog(value[index]),
                        title: Text('${value[index]}'),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}