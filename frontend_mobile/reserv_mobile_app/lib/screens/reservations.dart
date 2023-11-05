import 'package:flutter/material.dart';
import '../widgets/reservations/calendar.dart';
import 'package:table_calendar/table_calendar.dart';

class ReservationsPage extends StatelessWidget {
    const ReservationsPage({super.key});

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
                title: const Text('Reservations'),
            ),
            body: ReservationsCalendar(),
        );
    }
}