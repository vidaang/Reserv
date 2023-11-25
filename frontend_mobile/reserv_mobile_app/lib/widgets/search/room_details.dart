// ignore_for_file: use_build_context_synchronously, avoid_print, unused_local_variable, prefer_const_constructors, sort_child_properties_last
import 'dart:ffi';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import './create_reservation.dart';
import '../../services/api_service.dart';
import '../../services/jwt_token.dart';

class RoomDetails extends StatefulWidget {
  final String roomID;
  final String buildingID;
  final int? roomNumber;
  final String roomType;
  final String roomInfo;
  final List<dynamic>? mediaEquip;
  final int? capacity;

  const RoomDetails({
    required this.roomID,
    required this.buildingID,
    required this.roomNumber,
    required this.roomType,
    required this.roomInfo,
    required this.mediaEquip,
    required this.capacity,
  });

  @override
  _RoomDetailsState createState() => _RoomDetailsState();
}

class _RoomDetailsState extends State<RoomDetails> {
  String selectedTime = ""; // string of time interval selected (4-5:30 pm)
  String selectedDate = ""; // string of selected 

  DateTime dateTime = DateTime.now(); // set the initial date for cupertino scroll
  int _intvIndex = 0; // set the initial interval for INTERVAL cupertino scroll
  int _timeIndex = 0; // set initial value of TIME cupertino scroll

  List<String> timeIntervals = [
    '-', '30 minutes', '1 hour', '1 hour, 30 minutes', '2 hours', '2 hours, 30 minutes', '3 hours', '3 hours, 30 minutes', '4 hours',
    '4 hours, 30 minutes', '5 hours', '5 hours, 30 minutes', '6 hours', '6 hours, 30 minutes', '7 hours', '7 hours, 30 minutes', '8 hours',
    '8 hours, 30 minutes', '9 hours', '9 hours, 30 minutes', '10 hours', '10 hours, 30 minutes', '11 hours', '11 hours, 30 minutes', '12 hours',
    '12 hours, 30 minutes', '13 hours', '13 hours, 30 minutes', '14 hours', '14 hours, 30 minutes', '15 hours', '15 hours, 30 minutes', '16 hours',
    '16 hours, 30 minutes', '17 hours', '17 hours, 30 minutes', '18 hours', '18 hours, 30 minutes', '19 hours', '19 hours, 30 minutes', '20 hours',
    '20 hours, 30 minutes', '21 hours', '21 hours, 30 minutes', '22 hours', '22 hours, 30 minutes', '23 hours', '23 hours, 30 minutes', '24 hours',
  ];
  Map<String, dynamic> availabilityData = {};
  List<List<num>> unformatted = [];
  List<String> timesFormatted = [];

  Future<void> validateFields() async {
    try {
      // Check if a time is selected before navigating && rso is verified
      if (selectedTime != null) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CreateReservation(
              roomID: widget.roomID,
              date: selectedDate,
              time: selectedTime,
              buildingID: widget.buildingID,
              roomNumber: widget.roomNumber,
              startEnd: unformatted[_timeIndex],
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
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.all(16),
                margin: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        shape: BoxShape.rectangle,
                        // image: DecorationImage(
                        //   fit: BoxFit.cover,
                        //   image: AssetImage('assets/images/classroom.png'),
                        // ),
                      ),
                    ),
                    SizedBox(width: 16),

                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${widget.buildingID} ${widget.roomNumber}',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 10),
                          Text('Room Type: ${widget.roomType}'),
                          Text('Room Info: ${widget.roomInfo}'),
                          Text('Media Equip: ${widget.mediaEquip}'),
                          Text('Capacity: ${widget.capacity}'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              Container(
                padding: EdgeInsets.all(16),
                margin: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column (
                  children: [
                    Text(
                      'Search for Times',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    CupertinoButton(
                      child: Text(
                        'Date: ${DateFormat('MM-dd-yyyy').format(dateTime)}',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      color: Colors.blue,
                      onPressed: () {
                        showCupertinoModalPopup(
                          context: context,
                          builder: (BuildContext context) => SizedBox(
                            width: double.infinity,
                            height: 250,
                            child: CupertinoDatePicker(
                              backgroundColor: Colors.white,
                              initialDateTime: dateTime,
                              onDateTimeChanged: (DateTime newTime) {
                                setState(() {
                                  dateTime = newTime;
                                });
                              },
                              mode: CupertinoDatePickerMode.date,
                            ),
                          ),
                        ).then((value) {
                          selectedDate = DateFormat('MM-dd-yyyy').format(dateTime);
                        });
                      },
                    ),
                
                    SizedBox(height: 20),

                    CupertinoButton.filled(
                      child: Text('Time Interval: ${timeIntervals[_intvIndex]}',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      onPressed: () => showCupertinoModalPopup(
                        context: context, 
                        builder: (_) => SizedBox(
                          width: double.infinity,
                          height: 250,
                          child: CupertinoPicker(
                            backgroundColor: Colors.white,
                            itemExtent: 30,
                            scrollController: FixedExtentScrollController(
                              initialItem: 0,
                            ),
                            children: [
                              for (String interval in timeIntervals)
                                Text(interval),
                            ],
                            onSelectedItemChanged: (int value) {
                              setState(() {
                                _intvIndex = value;
                              });
                            },
                          ),
                        ),
                      ),
                    ),

                    SizedBox(height: 20),

                    ElevatedButton(
                      onPressed: () async {
                        // Call the createEvent function
                        try {
                          final String? token = await JWTToken.getToken('Token');
                          if (token != null) {
                            availabilityData = await ApiService.getAvailability(
                              widget.roomID,
                              selectedDate,
                              _intvIndex,
                              token);
                          }

                          unformatted = availabilityData['unformatted'];
                          timesFormatted = availabilityData['formatted'];
                        } catch (e) {
                          print('Error searching for available times: $e');
                        }
                      },
                      child: const Text('Search for Times'),
                    ),
                  ],
                ),
              ),

              Container (
                padding: EdgeInsets.all(16),
                margin: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column (
                  children: [
                    Text(
                      'Available Times',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    CupertinoButton.filled(
                      child: Text('Selected Time: $selectedTime',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      onPressed: () => showCupertinoModalPopup(
                        context: context, 
                        builder: (_) => SizedBox(
                          width: double.infinity,
                          height: 250,
                          child: CupertinoPicker(
                            backgroundColor: Colors.white,
                            itemExtent: 30,
                            scrollController: FixedExtentScrollController(
                              initialItem: 0,
                            ),
                            children: [
                              for (String time in timesFormatted)
                                Text(time),
                            ],
                            onSelectedItemChanged: (int value) {
                              setState(() {
                                _timeIndex = value;
                              });
                            },
                          ),
                        ),
                      ).then((value) {
                          selectedTime = timesFormatted[_timeIndex];
                          print(selectedTime);
                      }),
                    ),

                    const SizedBox(height: 20),

                    ElevatedButton(
                      onPressed: () async {
                        await validateFields();
                      },
                      child: const Text('Continue to Reservation Form'),
                    ),
                  ]
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


// // ignore_for_file: use_build_context_synchronously, avoid_print, unused_local_variable, prefer_const_constructors, sort_child_properties_last
// import 'dart:ffi';
// import 'package:intl/intl.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/cupertino.dart';
// import './create_reservation.dart';
// import '../../services/api_service.dart';
// import '../../services/jwt_token.dart';

// class RoomDetails extends StatefulWidget {
//   final String roomID;
//   final String buildingID;
//   final int? roomNumber;
//   final String roomType;
//   final String roomInfo;
//   final List? mediaEquip;
//   final Int32? capacity;

//   const RoomDetails({
//     required this.roomID,
//     required this.buildingID,
//     required this.roomNumber,
//     required this.roomType,
//     required this.roomInfo,
//     required this.mediaEquip,
//     required this.capacity,
//   });

//   @override
//   // ignore: library_private_types_in_public_api
//   _RoomDetailsState createState() => _RoomDetailsState();
// }

// class _RoomDetailsState extends State<RoomDetails> {
//   String? selectedTime;
//   String selectedDate = "";
//   String? selectedTimeString = "";
//   int selectedIntervalNum = -1;
//   List<num> startTime = [];
//   List<String> timeIntervals = [
//     '30 minutes', '1 hour', '1 hour, 30 minutes', '2 hours', '2 hours, 30 minutes', '3 hours', '3 hours, 30 minutes', '4 hours',
//     '4 hours, 30 minutes', '5 hours', '5 hours, 30 minutes', '6 hours', '6 hours, 30 minutes', '7 hours', '7 hours, 30 minutes', '8 hours',
//     '8 hours, 30 minutes', '9 hours', '9 hours, 30 minutes', '10 hours', '10 hours, 30 minutes', '11 hours', '11 hours, 30 minutes', '12 hours',
//     '12 hours, 30 minutes', '13 hours', '13 hours, 30 minutes', '14 hours', '14 hours, 30 minutes', '15 hours', '15 hours, 30 minutes', '16 hours',
//     '16 hours, 30 minutes', '17 hours', '17 hours, 30 minutes', '18 hours', '18 hours, 30 minutes', '19 hours', '19 hours, 30 minutes', '20 hours',
//     '20 hours, 30 minutes', '21 hours', '21 hours, 30 minutes', '22 hours', '22 hours, 30 minutes', '23 hours', '23 hours, 30 minutes', '24 hours',
//   ];

//   num intervalIndex = -1;

//   DateTime dateTime = DateTime(2023, 1, 1);
//   int _intvIndex = 0;

//   Future<void> validateFields(String rsoName) async {
//     try {
//       // Check if a time is selected before navigating && rso is verified
//       if (selectedTime != null && startTime != []) {
//         // if (verificationResult) {
//           Navigator.push(
//             context,
//             MaterialPageRoute(
//               builder: (context) => CreateReservation(
//                 roomID: widget.roomID,
//                 date: '${dateTime.month}-${dateTime.day}-${dateTime.year}',
//                 time: selectedTime,
//                 startEnd: startTime,
//                 buildingID: widget.buildingID,
//                 roomNumber: widget.roomNumber,
//               ),
//             ),
//           );
//       } else {
//         showDialog(
//           context: context,
//           builder: (BuildContext context) {
//             return AlertDialog(
//               title: const Text('Selection Error'),
//               content: const Text('Please select an available time'),
//               actions: <Widget>[
//                 TextButton(
//                   onPressed: () {
//                     Navigator.of(context).pop();
//                   },
//                   child: const Text('OK'),
//                 ),
//               ],
//             );
//           },
//         );
//       }
//     } catch (e) {
//       print('Error: $e');
//     }
//   }
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Room Details'),
//       ),
//       body: SingleChildScrollView(
//         child: Center(
//           child: Column(
//             children: [
//               Container(
//                 padding: EdgeInsets.all(16),
//                 margin: EdgeInsets.all(16),
//                 decoration: BoxDecoration(
//                   border: Border.all(color: Colors.grey),
//                   borderRadius: BorderRadius.circular(10),
//                 ),
//                 child: Row(
//                   children: [
//                     Container(
//                       width: 350,
//                       height: 300,
//                       decoration: BoxDecoration(
//                         shape: BoxShape.rectangle,
//                         image: DecorationImage(
//                           fit: BoxFit.cover,
//                           image: AssetImage('../../../assets/images/classroom.png'),
//                         ),
//                       ),
//                     ),
//                     SizedBox(width: 16),

//                     Expanded(
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           // Display the room information at the top of the box
//                           Text(
//                             '${widget.buildingID} ${widget.roomNumber}',
//                             style: TextStyle(
//                               fontSize: 20,
//                               fontWeight: FontWeight.bold,
//                             ),
//                           ),
//                           SizedBox(height: 10),
//                           Text('Room Type: ${widget.roomType}'),
//                           Text('Room Info: ${widget.roomInfo}'),
//                           Text('Media Equip: ${widget.mediaEquip}'),
//                           Text('Capacity: ${widget.capacity}'),
//                         ],
//                       ),
//                     ),
//                   ],
//                 ),
//               ),

//               Text(
//                 'Search for an Available Time',
//                 style: TextStyle(
//                   fontSize: 20,
//                   fontWeight: FontWeight.bold,
//                 ),
//               ),

//               Container(
//                 padding: EdgeInsets.all(16),
//                 margin: EdgeInsets.all(16),
//                 decoration: BoxDecoration(
//                   border: Border.all(color: Colors.grey),
//                   borderRadius: BorderRadius.circular(10),
//                 ),
//                 child: Row (
//                   children: [
//                     CupertinoButton(
//                       child: Text(
//                         'Date: ${dateTime.month}-${dateTime.day}-${dateTime.year}',
//                         style: TextStyle(
//                           fontSize: 16,
//                           fontWeight: FontWeight.bold,
//                         ),
//                       ),
//                       color: Colors.blue,
//                       onPressed: () {
//                         showCupertinoModalPopup(
//                           context: context,
//                           builder: (BuildContext context) => SizedBox(
//                             width: double.infinity,
//                             height: 250,
//                             child: CupertinoDatePicker(
//                               backgroundColor: Colors.white,
//                               initialDateTime: dateTime,
//                               onDateTimeChanged: (DateTime newTime) {
//                                 setState(() => dateTime = newTime);
//                               },
//                               mode: CupertinoDatePickerMode.date,
//                             ),
//                           ),
//                         );
//                       },
//                     ),
                
//                     SizedBox(width: 35),

//                     CupertinoButton.filled(
//                       child: Text('Time Interval: $_intvIndex',
//                         style: TextStyle(
//                           fontSize: 16,
//                           fontWeight: FontWeight.bold,
//                         ),
//                       ),
//                       onPressed: () => showCupertinoModalPopup(
//                         context: context, 
//                         builder: (_) => SizedBox(
//                           width: double.infinity,
//                           height: 250,
//                           child: CupertinoPicker(
//                             backgroundColor: Colors.white,
//                             itemExtent: 30,
//                             scrollController: FixedExtentScrollController(
//                               initialItem: 0,
//                             ),
//                             children: [
//                               for (String interval in timeIntervals)
//                                 Text(interval),
//                             ],
//                             onSelectedItemChanged: (int value) {
//                               setState(() {
//                                 _intvIndex = value;
//                               });
//                             },
//                           ),
//                         ),
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
              
//               SizedBox(height: 20),

//               ElevatedButton(
//                 onPressed: () async {
//                   // Call the createEvent function
//                   try {
//                     final String? token = await JWTToken.getToken('Token');
//                     if (token != null) {
//                       await ApiService.getAvailability(widget.roomID, '${dateTime.month}-${dateTime.day}-${dateTime.year}', _intvIndex, token);
//                     }
//                   } catch (e) {
//                     print('Error searching for available times: $e');
//                   }
//                 },
//                 child: const Text('Search for Times'),
//               ),

//               // Dropdown menu of available times to select
//               // SizedBox(
//               //   height: 50,
//               //   child: DropdownButton<String>(
//               //     value: selectedTime,
//               //     items: timesFormatted
//               //         .map((String time) {
//               //           return DropdownMenuItem<String>(
//               //             value: time,
//               //             child: Text(time),
//               //           );
//               //         })
//               //         .toList(),
//               //     onChanged: (String? newSelectedTime) {
//               //       setState(() {
//               //         selectedTime = newSelectedTime;
//               //           if (selectedTime != null) {

//               //             int selectedIndex = timesFormatted.indexOf(selectedTime!);

//               //             if (selectedIndex > -1) {
//               //               startTime = unformatted[selectedIndex];
//               //             }
//               //           }
//               //       });
//               //     },
//               //     hint: const Text('Select Available Time'),
//               //   ),
//               // ),
//               // const SizedBox(height: 20),

//               // Button to navigate to Create Reservation
//               ElevatedButton(
//                 onPressed: () async {
//                   await validateFields("test");
//                 },
//                 child: const Text('Continue to Reservation Form'),
//               ),
//             ],
//           ),
//         ),
//       )
//     );
//   }
// }


//       // body: (
//       //   future: widget.availabilityData,
//       //   builder: (context, snapshot) {

//       //     if (snapshot.connectionState == ConnectionState.waiting) {
//       //       return const CircularProgressIndicator();
//       //     } 
//       //     else if (snapshot.hasError) {
//       //       return Text('Error: ${snapshot.error}');
//       //     } 
//       //     else {
//       //       // creating the array of available times
//       //       Map<String, dynamic> data = snapshot.data!;
//       //       List<List<num>> unformatted = [];
//       //       List<String> timesFormatted = [];

//       //       List<dynamic> makeSets = (data['continuousAvailability'] as List<dynamic>)
//       //           .map((dynamic item) {
                  
//       //             num start = item['start'];
//       //             num end = item['end'];

//       //             DateTime startTime = DateTime(2023, 1, 1, start.floor(), (start % 1 * 60).round());
//       //             DateTime endTime = DateTime(2023, 1, 1, end.floor(), (end % 1 * 60).round());

//       //             String formattedSlot = '${DateFormat.jm().format(startTime)} - ${DateFormat.jm().format(endTime)}';

//       //             unformatted.add([start, end]);
//       //             timesFormatted.add(formattedSlot);
//       //           })
//       //           .toList();
//       //     }
//       // );