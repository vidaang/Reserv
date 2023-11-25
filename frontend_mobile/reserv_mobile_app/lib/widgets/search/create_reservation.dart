// ignore_for_file: library_private_types_in_public_api, non_constant_identifier_names, avoid_print, use_build_context_synchronously
import 'package:flutter/material.dart';
import '../../services/api_service.dart';
import '../navbar.dart';
import '../../services/jwt_token.dart';

class CreateReservation extends StatefulWidget {
  final String roomID;
  final String date;
  final List<num> startEnd;
  final String? time;
  final String buildingID;
  final int? roomNumber;

  // ignore: prefer_const_constructors_in_immutables
  CreateReservation({
    Key? key,
    required this.roomID,
    required this.date,
    required this.time, // time to display to screen
    required this.startEnd, // array to pass to endpoint
    required this.buildingID,
    required this.roomNumber,
  }) : super(key: key);

  @override
  _CreateReservationState createState() => _CreateReservationState();
}

class _CreateReservationState extends State<CreateReservation> {
  final TextEditingController eventNameController = TextEditingController();
  final TextEditingController eventTypeController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController attendeesController = TextEditingController();
  bool atriumLobbyNeeded = false;
  bool multimediaEquipmentNeeded = false;
  bool agreeToStatement = false;

  bool isFormValid() {
    return eventNameController.text.isNotEmpty &&
        eventTypeController.text.isNotEmpty &&
        descriptionController.text.isNotEmpty &&
        attendeesController.text.isNotEmpty &&
        agreeToStatement;
  }

  // calling the create reservation endpoint
  Future<void> createReservationFunction(String RoomID, String Date, String EventName, String EventType, String Description, 
    int? Attendees, bool AtriumOccupy, bool MediaEquip, bool EventAgreement, List<num> StartEnd, String BuildingID, int? RoomNumber) async {
    try {
      final String? token = await JWTToken.getToken('Token');

      if (token != null) {

        await ApiService.createEvent(
          token,
          RoomID,
          Date,
          EventName,
          EventType,
          Description,
          Attendees,
          AtriumOccupy,
          MediaEquip,
          EventAgreement,
          StartEnd,
          BuildingID, 
          RoomNumber,
        );

        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Event Created'),
              content: const Text('Your event was sucessfully created!'),
              actions: <Widget>[
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                          builder: (context) => const NavBar()),
                    );
                  },
                  child: const Text('Return to Home'),
                ),
              ],
            );
          },
        );
      }
    } 
    catch (e) {
      // Handle different exceptions
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Failed to Create Event'),
            content: Text('Error creating event: $e'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                      builder: (context) => const NavBar(),
                    ),
                  );
                },
                child: const Text('Cancel Reservation'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('Edit Details'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Reservation'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Room: ${widget.buildingID} ${widget.roomNumber}'),
              Text('Date: ${widget.date}'),
              Text('Selected Time: ${widget.time}'),
              const SizedBox(height: 20),
              TextFormField(
                controller: eventNameController,
                decoration: const InputDecoration(labelText: 'Event Name'),
              ),
              TextFormField(
                controller: eventTypeController,
                decoration: const InputDecoration(labelText: 'Event Type'),
              ),
              TextFormField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Description'),
              ),
              TextFormField(
                controller: attendeesController,
                decoration: const InputDecoration(labelText: 'Attendees'),
                keyboardType: TextInputType.number,
              ),
              const Text('Will you need a part of the atrium or lobby?'),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        atriumLobbyNeeded = true;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: atriumLobbyNeeded ? Colors.green : null,
                    ),
                    child: const Text('Yes'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        atriumLobbyNeeded = false;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: !atriumLobbyNeeded ? Colors.red : null,
                    ),
                    child: const Text('No'),
                  ),
                ],
              ),
              const Text('Will you need multimedia equipment?'),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Update the state when "Yes" button is pressed
                      setState(() {
                        multimediaEquipmentNeeded = true;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: multimediaEquipmentNeeded ? Colors.green : null,
                    ),
                    child: const Text('Yes'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      // Update the state when "No" button is pressed
                      setState(() {
                        multimediaEquipmentNeeded = false;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: !multimediaEquipmentNeeded ? Colors.red : null,
                    ),
                    child: const Text('No'),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const Text(
                  'I understand that if the date I selected above is less than 7 business days in the future, it is unlikely that my request will be reviewed in time for my event. I also understand that the Registrar\'s Office is unable to accept rush requests.',
              ),
              CheckboxListTile(
                value: agreeToStatement,
                onChanged: (value) {
                  // Update the state when the checkbox is changed
                  setState(() {
                    agreeToStatement = value ?? false;
                  });
                },
                title: const Text(
                  'I agree to the statement above.',
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: isFormValid()
                    ? () async {
                        // Call the createEvent function
                        try {
                          await createReservationFunction(
                            widget.roomID,
                            widget.date, 
                            eventNameController.text, 
                            eventTypeController.text, 
                            descriptionController.text, 
                            int.parse(attendeesController.text), 
                            atriumLobbyNeeded, 
                            multimediaEquipmentNeeded, 
                            agreeToStatement, 
                            widget.startEnd,
                            widget.buildingID,
                            widget.roomNumber,
                          );
                        } catch (e) {
                          print('Error creating reservation: $e');
                        }
                      }
                    : null,
                child: const Text('Create Reservation'),
              ),
            ],
          ),
        ),
      )
    );
  }
}
