import 'package:flutter/material.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:reserv_mobile_app/screens/signup.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
import '../screens/complete_profile.dart';


class SettingsPage extends StatelessWidget { 
   SettingsPage({Key? key}) : super(key: key); 
  
  String _message = '';

  // final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _EmailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _retypePassController = TextEditingController();

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
                      color: const Color(0xFFF2F2F2),
                      border: Border.all(
                        color: const Color(0xFFF2F2F2),
                      ),
                      borderRadius:
                          const BorderRadius.all(Radius.circular(11))),
                  width: 310.0,
                  height: 710.0,
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 16.0),
          SizedBox(
                        width: 272,
                        height: 60,
                        
                          child: Text(
                            'Organization Information',
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
                        
                          child: Text(
                            'Login Information',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ))),
                        
                          
                
                          ],
                        ),
            )),
      ]), 
    ))); 
  
  }
}

