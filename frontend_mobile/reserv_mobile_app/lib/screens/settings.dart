import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:reserv_mobile_app/screens/signup.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
import '../screens/complete_profile.dart';
import '../widgets/settings/settings-util.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final ApiService apiService = ApiService();

  @override
  void initState() {
    super.initState();
    //initializeRSOFields();
    getRSOFields(); // Call the API when the page is opened
  }

  Future<void> getRSOFields() async {
    await fetchData();
  }

  @override
  Widget build(BuildContext context) {
    // Map<String, dynamic>? rsoInfo;

    // String rsoName = "";
    // String officerFirstName = "";
    // String officerLastName = "";
    // String officerEmail = "";
    // String phone = "";
    // String advisorName = "";
    // String advisorEmail = "";
    // String secondaryContactName = "";
    // String secondaryContactEmail = "";
    // String secondaryContactPhone = "";

    // storeData().then((result) {
    //   rsoInfo = result;
    //   // rsoName = rsoInfo['RSOName'];
    //   // officerFirstName = rsoInfo['OfficerFirstName'];
    //   // officerLastName = rsoInfo['OfficerLastName'];
    //   // officerEmail = rsoInfo['OfficerEmail'];
    //   // phone = rsoInfo['Phone'];
    //   // advisorName = rsoInfo['AdvisorName'];
    //   // advisorEmail = rsoInfo['AdvisorEmail'];
    //   // secondaryContactName = rsoInfo['SecondaryContactName'];
    //   // secondaryContactEmail = rsoInfo['SecondaryContactEmail'];
    //   // secondaryContactPhone = rsoInfo['SecondaryContactPhone'];
    // }).catchError((error) {
    //   // Handle errors
    //   print('Error calling storeData: $error');
    // });

    // print(rsoInfo['RSOName']);
    print(rsoInfo);
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
              height: 710.0,
              child: Column(
                children: <Widget>[
                  const SizedBox(height: 16.0),
                  SizedBox(
                      width: 272,
                      height: 60,
                      child: Text('Organization Information',
                          style: GoogleFonts.rubik(
                            textStyle: const TextStyle(
                                fontSize: 19,
                                fontWeight: FontWeight.bold,
                                color: Colors.black),
                          ))),
                  const Divider(
                    color: Colors.black,
                  ),
                  SizedBox(
                      width: 272,
                      height: 60,
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
                        'Username',
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
                      initialValue: rsoInfo['RSOName'],
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
                ],
              ),
            )),
          ]),
        )));
  }
}
