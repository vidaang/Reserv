// ignore_for_file: use_build_context_synchronously, non_constant_identifier_names

import 'package:flutter/material.dart';
import '../services/api_service.dart';
import './login.dart';
import 'package:google_fonts/google_fonts.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color.fromARGB(255, 233, 240, 211),
      body: SignUpForm(),
    );
  }
}

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});

  @override
  _SignUpFormState createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  String _message = '';
  final TextEditingController _EmailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _retypePassController = TextEditingController();

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
                        'Sign Up',
                        style: GoogleFonts.lexendDeca().copyWith(
                          fontSize: 32,
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
                            } else if (!value!.contains('@') || !value.contains('.')) {
                              return 'Please enter a valid email address';
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.6, 0),
                        child: SizedBox(
                          width: 200,
                          height: 25,
                          child: Text(
                            'Password',
                            style: GoogleFonts.lexendDeca().copyWith(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      Center (
                        child: SizedBox(
                          width: 262,
                          height: 35,
                          child: TextFormField(
                            decoration: InputDecoration(
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(53.0),
                                borderSide: const BorderSide(
                                  color: Color(0xFFDFDFDF),
                                ),
                              ),
                            ),
                            controller: _passController,
                            obscureText: true,
                            validator: (value) {
                              if (value?.isEmpty ?? true) {
                                return 'Please enter a Password';
                              }
                              return null;
                            },
                          ),
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.6, 0),
                        child: SizedBox(
                          width: 200,
                          height: 25,
                          child: Text(
                            'Retype Password',
                            style: GoogleFonts.lexendDeca().copyWith(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 262,
                        height: 35,
                        child: TextFormField(
                          decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(53.0),
                              borderSide: const BorderSide(
                                color: Color(0xFFDFDFDF),
                              ),
                            ),
                          ),
                          controller: _retypePassController,
                          obscureText: true,
                          validator: (value) {
                            if (value?.isEmpty ?? value != _passController.text) {
                              return 'Passwords do not match';
                            }
                            return null;
                          },
                        ),
                      ),
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
                            if (_EmailController.text.isNotEmpty && _passController.text.isNotEmpty) {
                              String Email = _EmailController.text;
                              String Password = _passController.text;

                              try {
                                final response = await ApiService.signUp(
                                  Email: Email,
                                  Password: Password,
                                );

                                if (response.containsKey('success') && response['success']) {
                                  setState(() {
                                    _message =
                                        'Account created! Please check your email to verify your account.';
                                  });
                                  _EmailController.clear();
                                  _passController.clear();
                                  _retypePassController.clear();

                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: const Text('Check your Email'),
                                        content: const Text(
                                          'Please check your email to verify your account.',
                                        ),
                                        actions: <Widget>[
                                          TextButton(
                                            onPressed: () {
                                              Navigator.of(context).pushReplacement(
                                                MaterialPageRoute(
                                                  builder: (context) => const LoginScreen(),
                                                ),
                                              );
                                            },
                                            child: const Text('Return to Login'),
                                          ),
                                        ],
                                      );
                                    },
                                  );
                                } else {
                                  setState(() {
                                    _message = 'Sign-up failed: ${response['error']}';
                                  });
                                }
                              } catch (e) {
                                setState(() {
                                  _message = 'An error occurred: $e';
                                });
                              }
                            } else {
                              setState(() {
                                _message = 'Please fill out all fields.';
                              });
                              return;
                            }
                          },
                          child: Text(
                            'Sign Up',
                            style: GoogleFonts.lexendDeca().copyWith(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
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
