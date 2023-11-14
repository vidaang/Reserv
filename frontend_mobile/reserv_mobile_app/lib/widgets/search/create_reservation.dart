import 'package:flutter/material.dart';

class CreateReservation extends StatelessWidget {
  final String selectedTime;
  final String buildingID;
  final int? roomNumber;

  const CreateReservation({
    Key? key,
    required this.selectedTime,
    required this.buildingID,
    required this.roomNumber,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Implement the UI for CreateReservation using the passed parameters
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Reservation'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('$buildingID $roomNumber'),
            Text('Selected Time: $selectedTime')
          ],
        ),
      ),
    );
  }
}