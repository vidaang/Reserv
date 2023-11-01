import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'home.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Up'),
      ),
      body: const SignUpForm(),
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
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
                        TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Organization Email'),
              validator: (value) {
                if (value?.isEmpty ?? true || !value!.contains('@')) {
                  return 'Please enter a organization email address';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            TextFormField(
              controller: _passController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter a password';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            TextFormField(
              controller: _retypePassController,
              decoration: const InputDecoration(labelText: 'Retype Password'),
              obscureText: true,
              validator: (value) {
                if (value?.isEmpty ?? true || value != _passController.text) {
                  return 'Passwords do not match';
                }
                return null;
              },
            ),
            const SizedBox(height: 24.0),
            TextFormField(
              controller: _firstNameController,
              decoration: const InputDecoration(labelText: 'Officer First Name'),
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter first name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            TextFormField(
              controller: _lastNameController,
              decoration: const InputDecoration(labelText: 'Officer Last Name'),
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter last name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
                        TextFormField(
              controller: _orgNameController,
              decoration: const InputDecoration(labelText: 'Organization Name'),
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter organization name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            TextFormField(
              controller: _orgPhoneController,
              decoration: const InputDecoration(labelText: 'Phone'),
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter organization phone number';
                }
                return null;
              },
            ),
            const SizedBox(height: 24.0),
                        TextFormField(
              controller: _advNameController,
              decoration: const InputDecoration(labelText: 'Advisor Name'),
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter advisor name';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            TextFormField(
              controller: _advEmailController,
              decoration: const InputDecoration(labelText: 'Advisor Email'),
              validator: (value) {
                if (value?.isEmpty ?? true || !value!.contains('@')) {
                  return 'Please enter advisor email address';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            ElevatedButton (
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

                        // Redirect to the home page
                        Navigator.of(context).pushReplacement(
                          MaterialPageRoute(builder: (context) => const HomePage()),
                        );
                      } else {
                        // Sign-up failed, show error message
                        setState(() {
                          _message = 'Sign-up failed: ${response['error']}';
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
              child: const Text('Sign Up'),
            ),
          ],
        ),
      ),
    );
  }
}
