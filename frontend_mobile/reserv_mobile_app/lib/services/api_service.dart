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
    const String uri = "https://knightsreserv-00cde8777914.herokuapp.com/api/RetrieveRooms";

    final Map<String, String> requestBody = {
      'Latitude': latitude,
      'Longitude': longitude,
    };

    final response = await http.post(
      Uri.parse(uri),
      body: json.encode(requestBody),
      headers: {
        'Content-Type': 'application/json'
      },
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to retrieve rooms: ${response.statusCode}');
    }
  }

  static const String baseUrl = "https://knightsreserv-00cde8777914.herokuapp.com"; // Replace with your actual API base URL

  static Future<Map<String, dynamic>> getAvailability(String roomID, String date, int intervals) async {
    // Construct the API endpoint URL
    final apiUrl = "$baseUrl/api/availability/$roomID/$date/$intervals";

    try {
      // Make the API request
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        // Parse and return the response JSON
        return json.decode(response.body);
      } else {
        // If the server did not return a 200 OK response,
        // throw an exception with the error message.
        throw Exception('Failed to load availability');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      throw Exception('Failed to connect to the server. Please check your internet connection.');
    }
  }

  static Future<bool> checkVerification(String rsoName) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/checkVerification'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'RSOName': rsoName}),
      );

      if (response.statusCode == 200) {
        Map<String, dynamic> data = jsonDecode(response.body);

        bool verificationResult = data['result'] ?? false;

        return verificationResult;
      } else {
        throw Exception('Failed to check verification: ${response.statusCode}');
      }
    } catch (e) {
      print('Exception during verification check: $e');
      return false;
    }
  }

  static Future<void> createEvent(String token, String RSOID, String RoomID, String Date, 
    String EventName, String EventType, String Description, int? Attendees, bool AtriumOccupy, 
    bool MediaEquip, bool EventAgreement, List<num> StartEnd) async {

    Map<String, dynamic> requestBody = {
      'RSOID': RSOID,
      'RoomID': RoomID,
      'Date': Date,
      'StartEnd': StartEnd,
      'EventName': EventName,
      'EventType': EventType,
      'Description': Description,
      'Attendees': Attendees,
      'AtriumOccupy': AtriumOccupy,
      'MediaEqip': MediaEquip,
      'EventAgreement': EventAgreement,
    };

    // Make the API request
    try {
      final response = await http.post(
        Uri.parse('https://knightsreserv-00cde8777914.herokuapp.com/api/createEvent'),
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer $token',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        print('Event created successfully! Event ID: ${responseData['eventId']}');
      } else {
        throw Exception('Failed to create event. Status code: ${response.statusCode}, Body: ${response.body}');
      }
    } catch (e) {
      throw Exception('Failed to create event. Error: $e');
    }
  }
}
