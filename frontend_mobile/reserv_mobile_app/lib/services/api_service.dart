import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final Uri uri = Uri.parse('https://knightsreserv-00cde8777914.herokuapp.com/api/login'); // Replace with your API endpoint
    final Map<String, String> requestBody = {
      'email': email,
      'password': password,
    };
    final response = await http.post(
      uri,
      body: jsonEncode(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Login failed with status code: ${response.statusCode}');
    }
  }

  static Future<Map<String, dynamic>> signUp({
    required String email,
    required String password,
    required String officerFirstName,
    required String officerLastName,
    required String rsoName,
    required String phone,
    required String advisorName,
    required String advisorEmail,
  }) async {
    final Uri uri = Uri.parse('https://knightsreserv-00cde8777914.herokuapp.com/api/createRSO'); // Replace with your API endpoint
    final Map<String, String> requestBody = {
      'Email': email,
      'Password': password,
      'OfficerFirstName': officerFirstName,
      'OfficerLastName': officerLastName,
      'RSOName': rsoName,
      'Phone': phone,
      'AdvisorName': advisorName,
      'AdvisorEmail': advisorEmail,
    };
    final response = await http.post(
      uri,
      body: jsonEncode(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Sign-up failed with status code: ${response.statusCode}');
    }
  }
}
