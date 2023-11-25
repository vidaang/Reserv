// ignore_for_file: use_build_context_synchronously, avoid_print

import 'package:flutter/material.dart';
import '../../services/api_service.dart';
import 'room_details.dart';
import '../../services/jwt_token.dart';

class RoomList extends StatelessWidget {
  final Map<String, dynamic> data;

  const RoomList({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Check if data is empty or null
    if (data.isEmpty) {
      return const Scaffold(
        body: Center(
          child: Text('No rooms available!'),
        ),
      );
    }
    
    final List<dynamic> roomList = data['roomList'];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Available Rooms'),
        backgroundColor: Colors.white,
      ),
      body: ListView.builder(
        itemCount: roomList.length,
        itemBuilder: (context, index) {
          final room = roomList[index];

          return Card(
            margin: const EdgeInsets.all(8.0),
            child: ListTile(
              title: Text('${room['BuildingID']} ' ' ${room['RoomNumber']}'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [                 
                  Text('Room Type: ${room['RoomType']}'),
                  const Text('Capacity: '),
                ],
              ),
              onTap: () async {
                // Handle the tap on a room, you can navigate to a detailed page or perform other actions
                print('Selecting ${room['BuildingID']} ' ' ${room['RoomNumber']}...');
                
                try {
                  final String? token = await JWTToken.getToken('Token');

                  if (token != null) {
                    // Instantiate the RoomDetails widget and pass the availabilityData
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => RoomDetails(
                          roomID: room['RoomID'],
                          buildingID: room['BuildingID'],
                          roomNumber: room['RoomNumber'],
                          roomType: room['RoomType'],
                          roomInfo: room['RoomInfo'],
                          mediaEquip: room['MediaEquip'],
                          capacity: room['Capacity'],
                        ),
                      ),
                    );
                  }
                  else {
                    throw Exception('JWT token not available');
                  }
                } catch (error) {
                  // Handle errors
                  print(error.toString());
                }
              },
            ),
          );
        },
      )
    );
  }
}