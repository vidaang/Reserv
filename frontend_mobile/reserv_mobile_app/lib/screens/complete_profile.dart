import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
class CompleteProfile extends StatefulWidget {
  @override
  _CompleteProfileState createState() => _CompleteProfileState();
}

class _CompleteProfileState extends State<CompleteProfile> {
  // Declare variables to hold the values of the input fields
  String rsoName = "";
  String officerFirstName = "";
  String officerLastName = "";
  String officerEmail = "";
  String phone = "";
  String advisorName = "";
  String advisorEmail = "";
  String secondaryContactName = "";
  String secondaryContactEmail = "";
  String secondaryContactPhone = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Complete Profile"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("RSO Name"),
            TextField(
              onChanged: (value) {
                setState(() {
                  rsoName = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Officer First Name"),
            TextField(
              onChanged: (value) {
                setState(() {
                  officerFirstName = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Officer Last Name"),
            TextField(
              onChanged: (value) {
                setState(() {
                  officerLastName = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Officer Email"),
            TextField(
              onChanged: (value) {
                setState(() {
                  officerEmail = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Phone"),
            TextField(
              onChanged: (value) {
                setState(() {
                  phone = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Advisor Name"),
            TextField(
              onChanged: (value) {
                setState(() {
                  advisorName = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Advisor Email"),
            TextField(
              onChanged: (value) {
                setState(() {
                  advisorEmail = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Secondary Contact Name"),
            TextField(
              onChanged: (value) {
                setState(() {
                  secondaryContactName = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Secondary Contact Email"),
            TextField(
              onChanged: (value) {
                setState(() {
                  secondaryContactEmail = value;
                });
              },
            ),
            SizedBox(height: 16.0),
            Text("Secondary Contact Phone"),
            TextField(
              onChanged: (value) {
                setState(() {
                  secondaryContactPhone = value;
                });
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          // Call JWTToken to retrieve the token
          final String? token = await JWTToken.getToken('Token');

          if (token != null) {
            try {
              // Call the updateRSOInfo function
              final Map<String, dynamic> response = await ApiService.updateRSOInfo(
                token: token,
                RSOName: rsoName,
                OfficerFirstName: officerFirstName,
                OfficerLastName: officerLastName,
                OfficerEmail: officerEmail,
                Phone: phone,
                AdvisorName: advisorName,
                AdvisorEmail: advisorEmail,
                SecondaryContactName: secondaryContactName,
                SecondaryContactEmail: secondaryContactEmail,
                SecondaryContactPhone: secondaryContactPhone,
              );

              // Check the response
              if (response.containsKey('success') && response['success'] == true) {
                // If the response indicates success, redirect to NavBar()
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                    builder: (context) => const NavBar(),
                  ),
                );
              } else {
                // Handle other response statuses or errors
                // You might want to display an error message or take appropriate action
                print('Update RSO Info failed. Unexpected response format.');
              }
            } catch (e) {
              // Handle network or other errors
              print('Update RSO Info failed: $e');
            }
          } else {
            // Handle the case where the token is null
            print('JWTToken failed: Token is null');
          }
        },
        child: Icon(Icons.check),
      ),
    );
  }
}