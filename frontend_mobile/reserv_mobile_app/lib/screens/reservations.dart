import 'package:flutter/material.dart';
import '../widgets/reservations/calendar.dart';

class ReservationsPage extends StatelessWidget {
    const ReservationsPage({super.key});

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            backgroundColor: const Color(0xFFF0E9D3),
            appBar: AppBar(
                backgroundColor: const Color(0xFF526760),
                title: const Text('Reservations'),
            ),
            body: const ReservationsCalendar(),
        );
    }
}