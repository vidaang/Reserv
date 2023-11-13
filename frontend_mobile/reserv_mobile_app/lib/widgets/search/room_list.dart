import 'package:flutter/material.dart';

class RoomList extends StatelessWidget {
  final Map<String, dynamic> data;

  const RoomList({super.key, required this.data});

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

    return Scaffold(
      body: Center(
        child: Text(
          '$data',
          style: const TextStyle(fontSize: 16),
        ),
      ),
    );
  }
}


// import 'package:flutter/material.dart';
// import 'package:google_maps_flutter/google_maps_flutter.dart';
// import 'package:sliding_up_panel/sliding_up_panel.dart';

// class RoomList extends StatelessWidget {
//   final String title;
//   final String snippet;

//   RoomList({required this.title, required this.snippet});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         crossAxisAlignment: CrossAxisAlignment.center,
//         children: [
//           Text('Title: $title'),
//           Text('Snippet: $snippet'),
//         ],
//       ),
//     );
//   }
// }
