import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  // Handling for Login API
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

  // Handling for Sign Up API
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
    final Uri uri = Uri.parse('https://knightsreserv-00cde8777914.herokuapp.com/api/createRSO');
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

  // Handling for Search Rooms API
  static Future<Map<String, dynamic>> retrieveRooms(String latitude, String longitude) async {
  const String apiUrl = "https://knightsreserv-00cde8777914.herokuapp.com/api/RetrieveRooms";

  final Map<String, String> requestBody = {
    'Latitude': latitude,
    'Longitude': longitude,
  };

  final response = await http.post(
    Uri.parse(apiUrl),
    body: json.encode(requestBody),
    headers: {'Content-Type': 'application/json'},
  );

  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to retrieve rooms');
  }
}
}
