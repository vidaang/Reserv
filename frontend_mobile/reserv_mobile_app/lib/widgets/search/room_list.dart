import 'package:flutter/material.dart';
import '../../services/api_service.dart';
import './room_details.dart';

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
              onTap: () {
                // Handle the tap on a room, you can navigate to a detailed page or perform other actions
                print('Selecting ${room['BuildingID']} ' ' ${room['RoomNumber']}...');
                
                try {
                  // Instantiate the RoomDetails widget and pass the availabilityData
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => RoomDetails(
                        buildingID: room['BuildingID'],
                        roomNumber: room['RoomNumber'],
                        roomType: room['RoomType'],
                        roomInfo: room['RoomInfo'],
                        mediaEquip: room['MediaEquip'],
                        capacity: room['Capacity'],
                        date: "11-25-2023",
                        interval: 1,
                        availabilityData: ApiService.getAvailability(room['RoomID'], "11-25-2023", 1),
                      ),
                    ),
                  );
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