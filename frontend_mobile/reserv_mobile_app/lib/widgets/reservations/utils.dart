import 'dart:collection';
import '../../services/api_service.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';
import '../../services/jwt_token.dart';

/// Example event class.
class Event {
  final String title;
  final String time;
  final String place;

  const Event(this.title, {required this.time, required this.place});

  @override
  String toString() => '$title\nLocation: $place\nTime: $time';
}

/// Example events.
///
/// Using a [LinkedHashMap] is highly recommended if you decide to use a map.

var _kEventSource = LinkedHashMap<DateTime, List<Event>>();

int getHashCode(DateTime key) {
  return key.day * 1000000 + key.month * 10000 + key.year;
}

final DateFormat dateFormat = DateFormat("MM-dd-yyyy");

Future<void> fetchEvents() async {
  try {
    print("Fetching...");

    final String? token = await JWTToken.getToken('Token');

    if (token != null) {
      final response = await ApiService.retrieveEvents(token);
      final eventList = response['eventList'];
      var count = 0;
      for (var eventMap in eventList) {
        print(eventMap);
        final eventDate = eventMap['Date'].split('-');
        final year = int.parse(eventDate[2]);
        final month = int.parse(eventDate[0]);
        final day = int.parse(eventDate[1]);
        final calendarDate = DateTime(year, month, day);
        final formattedDate = dateFormat.format(calendarDate);
        final Event event = Event(
          eventMap['EventName'],
          time: formattedDate,
          place: eventMap['AtriumBuilding'],
        );
        _kEventSource[calendarDate] = _kEventSource[calendarDate] ?? [];
        _kEventSource[calendarDate]?.add(event);
        setEvents(_kEventSource);
      }
    }
    else {
      throw Exception('JWT token not available');
    }
  } catch (e) {
    print('Error fetching events: $e');
  }
}

LinkedHashMap<DateTime, List<Event>> kEvents = LinkedHashMap<DateTime, List<Event>>(
  equals: isSameDay,
  hashCode: getHashCode,
);

void setEvents(LinkedHashMap<DateTime, List<Event>> source)
{
  kEvents = LinkedHashMap<DateTime, List<Event>>(
    equals: isSameDay,
    hashCode: getHashCode,
  )..addAll(source);
}

void clearEventSource()
{
  _kEventSource = LinkedHashMap<DateTime, List<Event>>();
}

/// Returns a list of [DateTime] objects from [first] to [last], inclusive.
List<DateTime> daysInRange(DateTime first, DateTime last) {
  final dayCount = last.difference(first).inDays + 1;
  return List.generate(
    dayCount,
    (index) => DateTime.utc(first.year, first.month, first.day + index),
  );
}

final kToday = DateTime.now();
final kFirstDay = DateTime(kToday.year, kToday.month - 3, kToday.day);
final kLastDay = DateTime(kToday.year, kToday.month + 3, kToday.day);
