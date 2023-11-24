// ignore_for_file: use_build_context_synchronously, avoid_print, unused_local_variable
import 'dart:ffi';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import './create_reservation.dart';
import '../../services/api_service.dart';
import '../../services/jwt_token.dart';

class RoomDetails extends StatefulWidget {
  final Future<Map<String, dynamic>> availabilityData;
  final String roomID;
  final String buildingID;
  final int? roomNumber;
  final String roomType;
  final String roomInfo;
  final List? mediaEquip;
  final Int32? capacity;
  final String date;
  final int? interval;

  const RoomDetails({
    super.key,
    required this.roomID,
    required this.buildingID,
    required this.roomNumber,
    required this.roomType,
    required this.roomInfo,
    required this.mediaEquip,
    required this.capacity,
    required this.availabilityData,
    required this.date,
    required this.interval,
  });

  @override
  // ignore: library_private_types_in_public_api
  _RoomDetailsState createState() => _RoomDetailsState();
}

class _RoomDetailsState extends State<RoomDetails> {
  String? selectedTime;
  String selectedDate = "";
  String selectedTimeString = "";
  int selectedIntervalNum = -1;
  List<num> startTime = [];

  Future<void> checkVerificationFunction(String rsoName) async {
    try {
      // Check if a time is selected before navigating && rso is verified
      if (selectedTime != null && startTime != []) {
        // if (verificationResult) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => CreateReservation(
                roomID: widget.roomID,
                date: selectedDate,
                time: selectedTime,
                startEnd: startTime,
                buildingID: widget.buildingID,
                roomNumber: widget.roomNumber,
              ),
            ),
          );
      } else {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Selection Error'),
              content: const Text('Please select an available time'),
              actions: <Widget>[
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('OK'),
                ),
              ],
            );
          },
        );
      }
    } catch (e) {
      print('Error: $e');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: const Text('Room Details'),
      ),

      body: FutureBuilder<Map<String, dynamic>>(
        future: widget.availabilityData,
        builder: (context, snapshot) {

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {

            // creating the array of available times
            Map<String, dynamic> data = snapshot.data!;
            List<List<num>> unformatted = [];
            List<String> timesFormatted = [];

            List<dynamic> makeSets = (data['continuousAvailability'] as List<dynamic>)
                .map((dynamic item) {
                  
                  num start = item['start'];
                  num end = item['end'];

                  DateTime startTime = DateTime(2023, 1, 1, start.floor(), (start % 1 * 60).round());
                  DateTime endTime = DateTime(2023, 1, 1, end.floor(), (end % 1 * 60).round());

                  String formattedSlot = '${DateFormat.jm().format(startTime)} - ${DateFormat.jm().format(endTime)}';

                  unformatted.add([start, end]);
                  timesFormatted.add(formattedSlot);
                })
                .toList();

            return SingleChildScrollView(
              child: Center(
                child: Column(
                  children: [
                    // Display the room information at the top of the page
                    Text('${widget.buildingID} ${widget.roomNumber}'),
                    Text('Room Type: ${widget.roomType}'),
                    Text('Room Info: ${widget.roomInfo}'),
                    Text('Media Equip: ${widget.mediaEquip}'), // CHANGE
                    Text('Capacity: ${widget.capacity}'), // CHANGE
                    Text('Date: ${widget.date}'),
                    Text('Interval: ${widget.interval}'),
/*
                    // ------------------------------------------------------------------------------------------------------------------------------- //
                    // SEARCH BAR FOR ROOM DETAILS PAGE
                    SizedBox(
                      height: 150,
                      // CALENDAR WIDGET THAT ALLOWS USERS TO SELECT A SINGLE DATE



                      // DROP DOWN MENU THAT ALLOWS USERS TO SELECT AN AVAILABLE INTERVAL
                          // variables needed to be set: String selectedDate (11-24-2023), String selectedTimeString (1 hour, 30 mins), int selectedTimeNum (3)
                          // will need to pass selected time string to the next screen create reservation
                      child: DropdownButton<String>(

                      ),



                      // SUBMIT BUTTON PROCESSES THE REQUEST TO THE API AND REFRESHES AVAILABLE TIMES LIST
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () async {
                          // Call the createEvent function
                          try {
                            final String? token = await JWTToken.getToken('Token');
                            if (token != null) {
                              await ApiService.getAvailability(widget.roomID, selectedDate, selectedIntervalNum, token);
                            }
                          } catch (e) {
                            print('Error searching for available times: $e');
                          }
                        },
                        child: const Text('Search for Times'),
                      ),
                    ),
                    // -------------------------------------------------------------------------------------------------------------------- //
*/
                    // Dropdown menu of available times to select
                    SizedBox(
                      height: 50,
                      child: DropdownButton<String>(
                        value: selectedTime,
                        items: timesFormatted
                            .map((String time) {
                              return DropdownMenuItem<String>(
                                value: time,
                                child: Text(time),
                              );
                            })
                            .toList(),
                        onChanged: (String? newSelectedTime) {
                          setState(() {
                            selectedTime = newSelectedTime;
                              if (selectedTime != null) {

                                int selectedIndex = timesFormatted.indexOf(selectedTime!);

                                if (selectedIndex > -1) {
                                  startTime = unformatted[selectedIndex];
                                }
                              }
                          });
                        },
                        hint: const Text('Select Available Time'),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Button to navigate to Create Reservation
                    ElevatedButton(
                      onPressed: () async {
                        await checkVerificationFunction("test");
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
