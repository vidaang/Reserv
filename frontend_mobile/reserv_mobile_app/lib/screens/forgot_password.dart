// ignore_for_file: use_build_context_synchronously, non_constant_identifier_names

import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'package:google_fonts/google_fonts.dart';

class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color.fromARGB(255, 233, 240, 211),
      body: ForgotPasswordForm(),
    );
  }
}

class ForgotPasswordForm extends StatefulWidget {
  const ForgotPasswordForm({super.key});

  @override
  _ForgotPasswordFormState createState() => _ForgotPasswordFormState();
}

class _ForgotPasswordFormState extends State<ForgotPasswordForm> {
  String _message = '';
  final TextEditingController _EmailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _retypePassController = TextEditingController();

  bool _isEmailValid(String email) {
    // Add your email validation rules here
    // For example: You can use a regular expression to check if the email is valid.
    final RegExp emailRegex = RegExp(r'^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$');
    return emailRegex.hasMatch(email);
  }

  bool _isPasswordComplex(String password) {
    // Add your password complexity rules here
    // For example: At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit.
    final RegExp passwordRegex =
        RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$');
    return passwordRegex.hasMatch(password);
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      // padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FittedBox(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(
                      color: Colors.white,
                    ),
                    borderRadius: const BorderRadius.all(Radius.circular(23)),
                  ),
                  width: 275,
                  height: 450,
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 17.0),
                      Text(
                        'Forgot Password',
                        style: GoogleFonts.lexendDeca().copyWith(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.6, 0),
                        child: SizedBox(
                          width: 200,
                          height: 25,
                          child: Text(
                            'Organization Email',
                            style: GoogleFonts.lexendDeca().copyWith(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
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
                              borderSide: const BorderSide(
                                color: Color(0xFFDFDFDF),
                              ),
                            ),
                          ),
                          controller: _EmailController,
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter an organization Email address';
                            } else if (!value!.contains('@') ||
                                !value.contains('.')) {
                              return 'Please enter a valid email address';
                            }
                            return null;
                          },
                        ),
                      ),
                      // const SizedBox(height: 16.0),
                      // Align(
                      //   alignment: const Alignment(-.6, 0),
                      //   child: SizedBox(
                      //     width: 200,
                      //     height: 25,
                      //     child: Text(
                      //       'Enter New Password',
                      //       style: GoogleFonts.lexendDeca().copyWith(
                      //         fontSize: 16,
                      //         fontWeight: FontWeight.bold,
                      //       ),
                      //     ),
                      //   ),
                      // ),
                      // Center (
                      //   child: SizedBox(
                      //     width: 262,
                      //     height: 35,
                      //     child: TextFormField(
                      //       decoration: InputDecoration(
                      //         enabledBorder: OutlineInputBorder(
                      //           borderRadius: BorderRadius.circular(53.0),
                      //           borderSide: const BorderSide(
                      //             color: Color(0xFFDFDFDF),
                      //           ),
                      //         ),
                      //       ),
                      //       controller: _passController,
                      //       obscureText: true,
                      //       validator: (value) {
                      //         if (value?.isEmpty ?? true) {
                      //           return 'Please enter a Password';
                      //         } else if (!_isPasswordComplex(value!)) {
                      //           return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.';
                      //         }
                      //         return null;
                      //       },
                      //     ),
                      //   ),
                      // ),
                      // const SizedBox(height: 16.0),
                      // Align(
                      //   alignment: const Alignment(-.6, 0),
                      //   child: SizedBox(
                      //     width: 200,
                      //     height: 25,
                      //     child: Text(
                      //       'Retype Password',
                      //       style: GoogleFonts.lexendDeca().copyWith(
                      //         fontSize: 16,
                      //         fontWeight: FontWeight.bold,
                      //       ),
                      //     ),
                      //   ),
                      // ),
                      // SizedBox(
                      //   width: 262,
                      //   height: 35,
                      //   child: TextFormField(
                      //     decoration: InputDecoration(
                      //       enabledBorder: OutlineInputBorder(
                      //         borderRadius: BorderRadius.circular(53.0),
                      //         borderSide: const BorderSide(
                      //           color: Color(0xFFDFDFDF),
                      //         ),
                      //       ),
                      //     ),
                      //     controller: _retypePassController,
                      //     obscureText: true,
                      //     validator: (value) {
                      //       if (value?.isEmpty ?? value != _passController.text) {
                      //         return 'Passwords do not match';
                      //       }
                      //       return null;
                      //     },
                      //   ),
                      // ),
                      const SizedBox(height: 16.0),
                      SizedBox(
                        width: 186,
                        height: 40,
                        child: TextButton(
                          style: ButtonStyle(
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(36.0),
                                side: const BorderSide(
                                  color: Color(0xFFDFDFDF),
                                ),
                              ),
                            ),
                          ),
                          onPressed: () async {
                              if (_EmailController.text.isEmpty) {
                                setState(() {
                                  _message = 'Please enter an organization email address.';
                                });
                                return;
                              } 
                              else if (!_isEmailValid(_EmailController.text)) {
                                setState(() {
                                  _message = 'Please enter a valid email address.';
                                });
                                return;
                              } 
                              else {
                                String Email = _EmailController.text;
                                try {
                                  await ApiService.ForgotPassword(Email);

                                  setState(() {
                                    _message = 'Email sent! Please check your email to recover your new password.';
                                  });
                                  _EmailController.clear();
                                } catch (e) {
                                  setState(() {
                                    _message = 'Failed to send email! Please ensure you have entered the correct email.';
                                  });
                                }
                              }
                          },
                          child: Text(
                            'Recover Password',
                            style: GoogleFonts.lexendDeca().copyWith(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ),
                        
                      ),
                      if (_message.isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          _message,
                          style: const TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}
