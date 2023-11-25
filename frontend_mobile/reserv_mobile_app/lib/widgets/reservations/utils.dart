// Copyright 2019 Aleksander Woźniak
// SPDX-License-Identifier: Apache-2.0

import 'dart:collection';
import '../../services/api_service.dart';

import 'package:table_calendar/table_calendar.dart';

/// Example event class.
class Event {
  final String title;
  final DateTime time;
  final String place;

  const Event(this.title, {required this.time, required this.place});

  @override
  String toString() => '$title\nLocation: $place\nTime: $time';
}

/// Example events.
///
/// Using a [LinkedHashMap] is highly recommended if you decide to use a map.
final kEvents = LinkedHashMap<DateTime, List<Event>>(
  equals: isSameDay,
  hashCode: getHashCode,
)..addAll(_kEventSource);

final _kEventSource = fetchEvents();

int getHashCode(DateTime key) {
  return key.day * 1000000 + key.month * 10000 + key.year;
}

Future<List<dynamic>> fetchEvents() async {
  try {
    final response = await eventApiService.retrieveEvents();
    final List<dynamic> eventList = response['eventList'];

    for (var eventMap in eventList) {
      final DateTime eventDate = DateTime.parse(eventMap['Date']);
      final Event event = Event(
        eventMap['EventName'],
        time: eventDate,
        place: eventMap['AtriumBuilding'],
      );

      kEvents[eventDate] = kEvents[eventDate] ?? [];
      kEvents[eventDate].add(event);
    }
    return list;
  } catch (e) {
    print('Error fetching events: $e');
  }
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
