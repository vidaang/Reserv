import 'package:flutter/material.dart';
import '../widgets/reservations/calendar.dart';
import 'package:table_calendar/table_calendar.dart';

class ReservationsPage extends StatelessWidget {
    const ReservationsPage({super.key});

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            backgroundColor: Color(0xFFF0E9D3),
            appBar: AppBar(
                backgroundColor: Color(0xFF526760),
                title: const Text('Reservations'),
            ),
            body: ReservationsCalendar(),
        );
    }
}