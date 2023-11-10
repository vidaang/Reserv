import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../widgets/navbar.dart'; 

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: const LoginForm(),
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
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          TextFormField(
            controller: _emailController,
            decoration: const InputDecoration(labelText: 'Email'),
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            controller: _passController,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Password'),
          ),
          const SizedBox(height: 24.0),
          
          ElevatedButton(
            onPressed: () async {
              // Validate the form
              if (_emailController.text.isEmpty || _passController.text.isEmpty) {
                setState(() {
                  _message = 'Please enter both email and password';
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
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (context) => const NavBar()),
                    );
                  } else {
                    // Login failed, show an error message
                    setState(() {
                      _message = 'Login failed: ${response['error']}';
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
            child: const Text('Log In'),
          ),
          Text(_message, style: const TextStyle(color: Colors.red),),
        ],
      ),
    );
  }
}