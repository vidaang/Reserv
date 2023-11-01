import 'package:flutter/material.dart';

class LandingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Landing Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Book Your Path to Knowledge: University Room Reservations',
              style: TextStyle(fontSize: 24.0),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Add your navigation logic here, e.g., navigate to another screen.
              },
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
    );
  }
}
