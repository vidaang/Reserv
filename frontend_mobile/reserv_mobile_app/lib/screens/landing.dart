import 'package:flutter/material.dart';
import 'login.dart'; 
import 'signup.dart';
import 'package:google_fonts/google_fonts.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 233, 240, 211),
      appBar: AppBar(
        title: const Text('Reserv'),
        backgroundColor: Color.fromARGB(255, 255, 255, 255)
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Book Your Path to Knowledge: University Room Reservations',
              style: GoogleFonts.lexendDeca().copyWith(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Navigate to the LoginScreen when the "Login" button is pressed.
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => const LoginScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(200, 149, 208, 125), // Button color
                  minimumSize: const Size(200, 50), // Button size
              ),
              child: Text(
                'Login',
                style: GoogleFonts.lexendDeca().copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Navigate to the SignUpScreen when the "Sign Up" button is pressed.
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => const SignUpPage()),
                );
              },
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(200, 149, 208, 125), // Button color
                  minimumSize: const Size(200, 50), // Button size
              ),
              child: Text(
                'Sign Up',
                style: GoogleFonts.lexendDeca().copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}



// import 'package:flutter/material.dart';

// class LandingPage extends StatelessWidget {
//   const LandingPage({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Landing Page'),
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             const Text(
//               'Book Your Path to Knowledge: University Room Reservations',
//               style: TextStyle(fontSize: 24.0),
//             ),
//             const SizedBox(height: 16.0),
//             ElevatedButton(
//               onPressed: () {
//                 // Add your navigation logic here, e.g., navigate to another screen.
//               },
//               child: const Text('Get Started'),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
