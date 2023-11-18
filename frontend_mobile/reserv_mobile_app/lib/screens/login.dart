import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:reserv_mobile_app/screens/signup.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart';
import '../services/jwt_token.dart';
import '../screens/complete_profile.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xFF88E19C),
      body: LoginForm(),
    );
  }
}

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  String _message = '';

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(42, 214, 42, 0),
      child: Center(
          child: Column(
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
                  width: 306.0,
                  height: 416.0,
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 17.0),
                      Text(
                        'Sign In',
                        style: GoogleFonts.rubik(
                          textStyle: const TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16.0),
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
                          decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(53.0),
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _emailController,
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
                          controller: _passController,
                          obscureText: true,
                        ),
                      ),
                      const SizedBox(height: 47.0),
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
                                          color: Color(0xFFDFDFDF))))),
                          onPressed: () async {
                            // Validate the form
                            if (_emailController.text.isEmpty ||
                                _passController.text.isEmpty) {
                              setState(() {
                                _message =
                                    'Please enter both email and password';
                              });
                              return;
                            } 
                            else {
                              try {
                                final response = await ApiService.login(
                                  _emailController.text,
                                  _passController.text,
                                );

                                if (response['error'] == null) {
                                  // Login was successful
                                  final Map<String, String?> tokenContents = await JWTToken.getTokenContents();
                                  print('Token contents: $tokenContents');
                                  
                                  final String? token = tokenContents['Token'];

                                  try {
                                    final bool check = await ApiService.checkRSOFields(token!);
                                    if (check) {
                                      Navigator.of(context).pushReplacement(
                                        MaterialPageRoute(
                                            builder: (context) => const NavBar()),
                                      );
                                    }
                                    else {
                                      Navigator.of(context).pushReplacement(
                                        MaterialPageRoute(
                                            builder: (context) => CompleteProfile()),
                                      );
                                    }
                                  }
                                  catch (e) {
                                    // Handle network or other errors
                                    setState(() {
                                      _message = 'checkRSO failed: $e';
                                    });
                                  }

                                } else {
                                  // Login failed, show an error message
                                  setState(() {
                                    _message =
                                        'Login failed! Ensure your email and RSO are verified!';
                                  });
                                }
                              } catch (e) {
                                // Handle network or other errors
                                setState(() {
                                  _message = 'Login failed! Ensure your email and RSO are verified!';
                                });
                              }
                            }
                          },
                          child: Text(
                            'Login',
                            style: GoogleFonts.rubik(
                              textStyle: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ),
                          ),
                        ),
                      ),
                      Text(
                        _message,
                        style: const TextStyle(color: Colors.red),
                      ),
                      const SizedBox(height: 5.0),
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
                                          color: Color(0xFFDFDFDF))))),
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                  builder: (context) => const SignUpPage()),
                            );
                          },
                          child: Text(
                            'Sign Up Here',
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
                  ))),
        ],
      )),
    );
  }
}
