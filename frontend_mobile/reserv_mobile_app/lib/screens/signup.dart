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

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _retypePassController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _orgNameController = TextEditingController();
  final TextEditingController _orgPhoneController = TextEditingController();
  final TextEditingController _advNameController = TextEditingController();
  final TextEditingController _advEmailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Center(
        key: _formKey,
        child: Column(
          // might not need
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
                    height: 800.0,
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _emailController,
                          validator: (value) {
                            if (value?.isEmpty ??
                                true || !value!.contains('@')) {
                              return 'Please enter a organization email address';
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _passController,
                          obscureText: true,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter a password';
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
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
                      Align(
                        alignment: const Alignment(-.6, 0),
                        child: SizedBox(
                          width: 140,
                          height: 20,
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
                          controller: _firstNameController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter officer first name';
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
                          controller: _lastNameController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter officer last name';
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.6, 0),
                        child: SizedBox(
                          width: 150,
                          height: 20,
                          child: Text(
                            'Organization Name',
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _orgNameController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter Organization name';
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.3, 0),
                        child: SizedBox(
                          width: 215,
                          height: 20,
                          child: Text(
                            'Organization Phone number',
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _orgPhoneController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter Organization phone number';
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.65, 0),
                        child: SizedBox(
                          width: 115,
                          height: 20,
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
                          controller: _advNameController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter Advisor name';
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Align(
                        alignment: const Alignment(-.5, 0),
                        child: SizedBox(
                          width: 175,
                          height: 20,
                          child: Text(
                            'Advisor Email Address',
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
                                borderSide:
                                    const BorderSide(color: Color(0xFFDFDFDF))),
                          ),
                          controller: _advEmailController,
                          validator: (value) {
                            if (value?.isEmpty ?? true) {
                              return 'Please enter Advisor email address';
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
                                          color: Color(0xFFDFDFDF))))),
                          onPressed: () async {
                            if (_formKey.currentState?.validate() ?? false) {
                              // Retrieve user input from form fields
                              String firstName = _firstNameController.text;
                              String lastName = _lastNameController.text;
                              String email = _emailController.text;
                              String password = _passController.text;
                              String orgName = _orgNameController.text;
                              String orgPhone = _orgPhoneController.text;
                              String advName = _advNameController.text;
                              String advEmail = _advEmailController.text;

                              // Call the API for sign-up
                              try {
                                final response = await ApiService.signUp(
                                  email: email,
                                  password: password,
                                  officerFirstName: firstName,
                                  officerLastName: lastName,
                                  rsoName: orgName,
                                  phone: orgPhone,
                                  advisorName: advName,
                                  advisorEmail: advEmail,
                                );

                                // Handle the response from the API
                                if (response['error'] == "") {
                                  // Sign-up was successful, reset the form and show success message
                                  setState(() {
                                    _message = 'Account created successfully';
                                  });
                                  _firstNameController.clear();
                                  _lastNameController.clear();
                                  _emailController.clear();
                                  _passController.clear();
                                  _retypePassController.clear();
                                  _orgNameController.clear();
                                  _orgPhoneController.clear();
                                  _advNameController.clear();
                                  _advEmailController.clear();

                                  // Redirect to the navbar
                                  Navigator.of(context).pushReplacement(
                                    MaterialPageRoute(
                                        builder: (context) => const NavBar()),
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
                            }
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
                    ]))),
          ],
        ),
      ),
    );
  }
}
