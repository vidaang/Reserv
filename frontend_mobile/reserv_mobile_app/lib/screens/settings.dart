import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:reserv_mobile_app/screens/signup.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
import '../screens/complete_profile.dart';
import '../widgets/settings/settings-util.dart';
import 'landing.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState<T> extends State<SettingsPage> {
  final ApiService apiService = ApiService();

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

  TextEditingController rsoNameController = TextEditingController();
  TextEditingController officerFirstNameController = TextEditingController();
  TextEditingController officerLastNameController = TextEditingController();
  TextEditingController officerEmailController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController advisorNameController = TextEditingController();
  TextEditingController advisorEmailController = TextEditingController();
  TextEditingController secondaryContactNameController =
      TextEditingController();
  TextEditingController secondaryContactEmailController =
      TextEditingController();
  TextEditingController secondaryContactPhoneController =
      TextEditingController();

  @override
  void initState() {
    super.initState();
//initializeRSOFields();
    getRSOFields(); // Call the API when the page is opened
    //  Future.delayed(Duration(seconds: 3), () {
    //    setState(() {
    //      rsoName =  rsoInfo['rsoName'];
    //       print(rsoName);
    //    });
    //  });
  }

  Future<void> getRSOFields() async {
    await fetchData();
    setState(() {
      print(rsoInfo);
      rsoInfo = rsoInfo;
      rsoNameController.text = rsoInfo['RSOName'].toString();
      officerFirstNameController.text = rsoInfo['OfficerFirstName'].toString();
      officerLastNameController.text = rsoInfo['OfficerLastName'].toString();
      officerEmailController.text = rsoInfo['OfficerEmail'].toString();
      phoneController.text = rsoInfo['Phone'].toString();
      advisorNameController.text = rsoInfo['AdvisorName'].toString();
      advisorEmailController.text = rsoInfo['AdvisorEmail'].toString();
      secondaryContactNameController.text =
          rsoInfo['SecondaryContactName'].toString();
      secondaryContactEmailController.text =
          rsoInfo['SecondaryContactEmail'].toString();
      secondaryContactPhoneController.text =
          rsoInfo['SecondaryContactPhone'].toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    print("RSO Info on widget built: $rsoInfo");
    return Container(
        color: Colors.white,
        child: SingleChildScrollView(
            child: Center(
          child: Column(children: <Widget>[
            const SizedBox(height: 31.0),
            Text('Settings',
                style: GoogleFonts.rubik(
                  textStyle: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                )),
            const SizedBox(height: 15.0),
            FittedBox(
                child: Container(
              decoration: BoxDecoration(
                  color: const Color(0xFFF2F2F2),
                  border: Border.all(
                    color: const Color(0xFFF2F2F2),
                  ),
                  borderRadius: const BorderRadius.all(Radius.circular(11))),
              width: 310.0,
              height: 1710.0,
              child: Column(
                children: <Widget>[
                  const SizedBox(height: 16.0),
                  SizedBox(
                      width: 272,
                      height: 40,
                      child: Text('Organization Information',
                          style: GoogleFonts.rubik(
                            textStyle: const TextStyle(
                                fontSize: 19,
                                fontWeight: FontWeight.bold,
                                color: Colors.black),
                          ))),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'RSO Name',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['RSOName'].toString()),
                      //initialValue: rsoInfo['RSOName'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          rsoName = value;
                        });
                      },
                      controller: rsoNameController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.5, 0),
                    child: SizedBox(
                      width: 200,
                      height: 15,
                      child: Text(
                        'Officer First Name',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['OfficerFirstName'].toString()),
                      //initialValue: rsoInfo['OfficerFirstName'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          officerFirstName = value;
                        });
                      },
                      controller: officerFirstNameController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.5, 0),
                    child: SizedBox(
                      width: 200,
                      height: 15,
                      child: Text(
                        'Officer Last Name',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['OfficerLastName'].toString()),
                      //initialValue: rsoInfo['OfficerLastName'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          officerLastName = value;
                        });
                      },
                      controller: officerLastNameController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'Officer Email',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['OfficerEmail'].toString()),
                      //initialValue: rsoInfo['OfficerEmail'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      controller: officerEmailController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'Phone',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['Phone'].toString()),
                      //initialValue: rsoInfo['Phone'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          phone = value;
                        });
                      },
                      controller: phoneController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'Advisor Name',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['AdvisorName'].toString()),
                      //initialValue: rsoInfo['AdvisorName'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          advisorName = value;
                        });
                      },
                      controller: advisorNameController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'Advisor Email',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['AdvisorEmail'].toString()),
                      //initialValue: rsoInfo['AdvisorEmail'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          advisorEmail = value;
                        });
                      },
                      controller: advisorEmailController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-0.5, 0),
                    child: SizedBox(
                      width: 200,
                      height: 15,
                      child: Text(
                        'Secondary Contact Name',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['SecondaryContactName'].toString()),
                      // initialValue: rsoInfo['SecondaryContactName'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          secondaryContactName = value;
                        });
                      },
                      controller: secondaryContactNameController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.5, 0),
                    child: SizedBox(
                      width: 200,
                      height: 15,
                      child: Text(
                        'Secondary Contact Email',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['SecondaryContactEmail'].toString()),
                      //initialValue: rsoInfo['SecondaryContactEmail'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          secondaryContactEmail = value;
                        });
                      },
                      controller: secondaryContactEmailController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.5, 0),
                    child: SizedBox(
                      width: 200,
                      height: 15,
                      child: Text(
                        'Secondary Contact Phone',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      key: Key(rsoInfo['SecondaryContactPhone'].toString()),
                      //initialValue: rsoInfo['SecondaryContactPhone'],
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      onChanged: (value) {
                        setState(() {
                          secondaryContactPhone = value;
                        });
                      },
                      controller: secondaryContactPhoneController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  SizedBox(
                      child: TextButton(
                    style: ButtonStyle(
                        shape:
                            MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(36.0),
                                    side: const BorderSide(
                                        color: Color(0xFFDFDFDF))))),
                    onPressed: () async {
                      // Call JWTToken to retrieve the token
                      final String? token = await JWTToken.getToken('Token');
                      rsoName = rsoNameController.text;
                      officerFirstName = officerFirstNameController.text;
                      officerLastName = officerLastNameController.text;
                      officerEmail = officerEmailController.text;
                      phone = phoneController.text;
                      advisorName = advisorNameController.text;
                      advisorEmail = advisorEmailController.text;
                      secondaryContactName =
                          secondaryContactNameController.text;
                      secondaryContactEmail =
                          secondaryContactEmailController.text;
                      secondaryContactPhone =
                          secondaryContactPhoneController.text;

                      if (token != null) {
                        try {
                          // Call the updateRSOInfo function
                          final Map<String, dynamic> response =
                              await ApiService.updateRSOInfo(
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
                          if (response.containsKey('success') &&
                              response['success'] == true) {
                            getRSOFields();
                          } else {
                            // Handle other response statuses or errors
                            // You might want to display an error message or take appropriate action
                            print(
                                'Update RSO Info failed. Unexpected response format.');
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
                    child: Text(
                      'Update',
                      style: GoogleFonts.rubik(
                        textStyle: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black),
                      ),
                    ),
                  )),
                  const Divider(
                    color: Colors.black,
                  ),
                  SizedBox(
                      width: 272,
                      height: 40,
                      child: Text('Login Information',
                          style: GoogleFonts.rubik(
                            textStyle: const TextStyle(
                                fontSize: 19,
                                fontWeight: FontWeight.bold,
                                color: Colors.black),
                          ))),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 103,
                      height: 15,
                      child: Text(
                        'Password',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      // should be filled here
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      // controller: _emailController,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: const Alignment(-.7, 0),
                    child: SizedBox(
                      width: 150,
                      height: 15,
                      child: Text(
                        'Retype Password',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 4.0),
                  SizedBox(
                    width: 262,
                    height: 28,
                    child: TextFormField(
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(53.0),
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF))),
                      ),
                      // controller: _passController,
                      obscureText: true,
                    ),
                  ),
                  SizedBox(
                    width: 186,
                    height: 40,
                    child: TextButton(
                      style: ButtonStyle(
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(36.0),
                                      side: const BorderSide(
                                          color: Color(0xFFDFDFDF))))),
                      onPressed: () async {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                              builder: (context) => const LandingPage()),
                        );
                      },
                      child: Text(
                        'Log Out',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 186,
                    height: 40,
                    child: TextButton(
                      style: ButtonStyle(
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(36.0),
                                      side: const BorderSide(
                                          color: Color(0xFFDFDFDF))))),
                      onPressed: () async {
                        try {
                          rsoName = rsoNameController.text;
                          await ApiService.deleteRSO(rsoName);
                          Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (context) => const LandingPage()),
                          );
                        } catch (e) {
                          // Handle network or other errors
                          print('Delete RSO failed: $e');
                        }
                      },
                      child: Text(
                        'Delete Account',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            )),
          ]),
        )));
  }
}
