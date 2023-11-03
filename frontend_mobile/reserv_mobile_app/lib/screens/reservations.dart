import 'package:flutter/material.dart';
// import '../widgets/reservations/calendar.dart';
import 'package:table_calendar/table_calendar.dart';

class ReservationsPage extends StatelessWidget {
    const ReservationsPage({super.key});

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
                title: const Text('Reservations'),
            ),
            body: Center(
                child: Column(
                    children: <Widget>[
                        TableCalendar(
                            firstDay: DateTime.utc(2010, 10, 16),
                            lastDay: DateTime.utc(2030, 3, 14),
                            focusedDay: DateTime.now(),
                        ),
                    ],
                ),
            ),
        );
    }
}