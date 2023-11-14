import 'dart:ffi';
import 'package:flutter/material.dart';
import './create_reservation.dart';

class RoomDetails extends StatefulWidget {
  final Future<Map<String, dynamic>> availabilityData;
  final String buildingID;
  final int? roomNumber;
  final String roomType;
  final String roomInfo;
  final List? mediaEquip;
  final Int32? capacity;

  const RoomDetails({
    super.key,
    required this.buildingID,
    required this.roomNumber,
    required this.roomType,
    required this.roomInfo,
    required this.mediaEquip,
    required this.capacity,
    required this.availabilityData,
  });

  @override
  _RoomDetailsState createState() => _RoomDetailsState();
}

class _RoomDetailsState extends State<RoomDetails> {
  String? selectedTime;
  String formattedSelectedTime = '';

  
  String convertDecimalToTime(double decimalTime) {
    int hours = decimalTime.toInt();
    int minutes = ((decimalTime - hours) * 60).toInt();
    return '$hours:${minutes.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.buildingID} ${widget.roomNumber}'), // Display buildingID and roomNumber as the title
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: widget.availabilityData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator(); // Display a loading indicator while data is being fetched
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
            Map<String, dynamic> data = snapshot.data!;
            List<String> availableTimes = (data['continuousAvailability'] as List<dynamic>)
                .map((dynamic item) => item.toString())
                .toList();

            return SingleChildScrollView(
              child: Center(
                child: Column(
                  children: [
                    ListView(
                      shrinkWrap: true,
                      children: [
                        ListTile(title: Text('Room Type: ${widget.roomType}')),
                        ListTile(title: Text('Room Info: ${widget.roomInfo}')),
                        ListTile(title: Text('Media Equip: ${widget.mediaEquip}')),
                        ListTile(title: Text('Capacity: ${widget.capacity}')),
                      ],
                    ),
                    SizedBox(
                      height: 50, // Set a fixed height for the DropdownButton container
                      child: DropdownButton<String>(
                        value: availableTimes.isNotEmpty ? availableTimes[0] : null,
                        items: availableTimes
                            .map((String time) {
                              // Split the continuous availability data into start and end values
                              List<String> values = time
                                .replaceAll(RegExp(r'start: |, end: '), '') // Remove 'start:' and ', end:' labels
                                .split(RegExp(r'[^0-9.]+'));

                              // Extract start and end values
                              String start = values[0];
                              String end = values[1];

                              // Format the time range
                              String formattedTime = '$start$end';

                              return DropdownMenuItem<String>(
                                value: time,
                                child: Text(formattedTime),
                              );
                            })
                            .toList(),
                        onChanged: (String? newSelectedTime) {
                          // Handle the selected time
                          setState(() {
                            selectedTime = newSelectedTime;
                            // Update the formatted selected time
                            if (selectedTime != null) {
                              List<String> values = selectedTime!.split(RegExp(r'start: |, end: '));
                              String start = values[0];
                              String end = values[1];
                              formattedSelectedTime = '$start$end';
                            }
                          });
                          print('Selected Time: $selectedTime');
                        },
                        hint: const Text('Select Available Time'),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text('Selected Time: $selectedTime'),

                    // Button to navigate to CreateReservation
                    ElevatedButton(
                      onPressed: () {
                        // Check if a time is selected before navigating
                        if (selectedTime != null) {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => CreateReservation(
                                selectedTime: selectedTime!,
                                buildingID: widget.buildingID,
                                roomNumber: widget.roomNumber,
                              ),
                            ),
                          );
                        } else {
                          // Handle the case where no time is selected
                          print('Please select a time before creating a reservation.');
                        }
                      },
                      child: const Text('Create Reservation'),
                    ),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
