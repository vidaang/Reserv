import 'package:flutter/material.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:reserv_mobile_app/screens/signup.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
import '../screens/complete_profile.dart';


class SettingsPage extends StatelessWidget { 
  const SettingsPage({Key? key}) : super(key: key); 
  
  @override 
  Widget build(BuildContext context) { 
    return Container( 
      color: Colors.white, 
      child: SingleChildScrollView(
        child: Center( 
        child: Column(
        children: <Widget>[ 
          const SizedBox(height: 31.0),
          
          Text(
            'Settings',
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
                      color: Color(0xFFF2F2F2),
                      border: Border.all(
                        color: Color(0xFFF2F2F2),
                      ),
                      borderRadius:
                          const BorderRadius.all(Radius.circular(11))),
                  width: 310.0,
                  height: 410.0,
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 16.0),
          SizedBox(
                        width: 272,
                        height: 60,
                        child: TextButton(
                          
                          onPressed: () async {
                            
                          },
                          child: Text(
                            'Organization Information',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                          ),
                          Divider(
                  color: Colors.black,
                ),
                SizedBox(
                        width: 272,
                        height: 60,
                        child: TextButton(
                          
                          onPressed: () async {
                            
                          },
                          child: Text(
                            'University Information',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                          ),
                          Divider(
                  color: Colors.black,
                ),
                SizedBox(
                        width: 272,
                        height: 60,
                        child: TextButton(
                          
                          onPressed: () async {
                            
                          },
                          child: Text(
                            'Notifications',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                          ),
                          Divider(
                  color: Colors.black,
                ),
                SizedBox(
                        width: 272,
                        height: 60,
                        child: TextButton(
                          
                          onPressed: () async {
                            
                          },
                          child: Text(
                            'Login Information',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                          ),
                          Divider(
                  color: Colors.black,
                ),
                SizedBox(
                        width: 272,
                        height: 60,
                        child: TextButton(
                          
                          onPressed: () async {
                            
                          },
                          child: Text(
                            'Other Settings',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                          ),
                          ],
                        ),
            )),
      ]), 
    ))); 
  } 
}

