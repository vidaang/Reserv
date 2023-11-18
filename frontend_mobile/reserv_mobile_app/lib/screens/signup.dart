import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import 'package:google_fonts/google_fonts.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xff90e49c),
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

  // final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _EmailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _retypePassController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Center(
            // key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                FittedBox(
                    child: Container(
                        decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.white,
                            ),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(23))),
                        // size of the rectangle, will need to change
                        width: 306.0,
                        height: 400,
                        child: Column(children: <Widget>[
                          const SizedBox(height: 17.0),
                          Text(
                            'Sign Up',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16.0),
                          Align(
                            alignment: const Alignment(-.6, 0),
                            child: SizedBox(
                              width: 150,
                              height: 20,
                              child: Text(
                                'Organization Email',
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
                                    borderSide: const BorderSide(
                                        color: Color(0xFFDFDFDF))),
                              ),
                              controller: _EmailController,
                              validator: (value) {
                                if (value?.isEmpty ??
                                    true || !value!.contains('@')) {
                                  return 'Please enter a organization Email address';
                                }
                                return null;
                              },
                            ),
                          ),
                          const SizedBox(height: 16.0),
                          Align(
                            alignment: const Alignment(-.6, 0),
                            child: SizedBox(
                              width: 140,
                              height: 20,
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
                          SizedBox(
                            width: 262,
                            height: 28,
                            child: TextFormField(
                              decoration: InputDecoration(
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(53.0),
                                    borderSide: const BorderSide(
                                        color: Color(0xFFDFDFDF))),
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
                          const SizedBox(height: 16.0),
                          Align(
                            alignment: const Alignment(-.6, 0),
                            child: SizedBox(
                              width: 140,
                              height: 20,
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
                          SizedBox(
                            width: 262,
                            height: 28,
                            child: TextFormField(
                              decoration: InputDecoration(
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(53.0),
                                    borderSide: const BorderSide(
                                        color: Color(0xFFDFDFDF))),
                              ),
                              controller: _retypePassController,
                              obscureText: true,
                              validator: (value) {
                                if (value?.isEmpty ??
                                    // get rid of the random "true" since the last condition is unreachable
                                    true || value != _passController.text) {
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
                                          borderRadius:
                                              BorderRadius.circular(36.0),
                                          side: const BorderSide(
                                              color: Color(0xFFDFDFDF))))),
                              onPressed: () async {
                                // changed this if condition from using formKey
                                if (_EmailController.text.isNotEmpty &&
                                    _passController.text.isNotEmpty) {
                                  // Retrieve user input from form fields
                                  String Email = _EmailController.text;
                                  String Password = _passController.text;

                                  // Call the API for sign-up
                                  try {
                                    final response = await ApiService.signUp(
                                      Email: Email,
                                      Password: Password,
                                    );

                                    // Handle the response from the API
                                    if (response.containsKey('success') && response['success']) {
                                      // Sign-up was successful, reset the form and show success message
                                      setState(() {
                                        _message =
                                            'Account created successfully';
                                      });
                                      _EmailController.clear();
                                      _passController.clear();
                                      _retypePassController.clear();

                                      // Redirect to the navbar
                                      Navigator.of(context).pushReplacement(
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                const NavBar()),
                                      );
                                    } else {
                                      // Sign-up failed, show error message
                                      setState(() {
                                        _message =
                                            'Sign-up failed: ${response['error']}';
                                      });
                                    }
                                  } catch (e) {
                                    // Handle network or other errors
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
                                style: GoogleFonts.rubik(
                                  textStyle: const TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black),
                                ),
                              ),
                            ),
                          ),
                        ]))),
              ],
            ),
          ),
        ));
  }
}
