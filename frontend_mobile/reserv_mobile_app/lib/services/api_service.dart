// ignore_for_file: non_constant_identifier_names

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'jwt_token.dart';

class ApiService {
  static const String baseUrl = "https://knightsreserv-00cde8777914.herokuapp.com";
  // Handling for Login API
  
  static Future<Map<String, dynamic>> login(String Email, String Password) async {
    final Uri uri = Uri.parse('$baseUrl/api/login');
    final Map<String, String> requestBody = {
      'Email': Email,
      'Password': Password,
    };
    final response = await http.post(
      uri,
      body: jsonEncode(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      // Extract the token from the response
      final Map<String, dynamic> responseData = jsonDecode(response.body);
      String token = responseData['token'];
      String rsoID = responseData['RSOID'];
      String uniID = responseData['UniID'];

      await JWTToken.setToken('Token', token);
      await JWTToken.setToken('RSOID', rsoID);
      await JWTToken.setToken('UniID', uniID);
  
      return responseData;
    } else {
      throw Exception('Login failed with status code: ${response.statusCode}');
    }
  }

  // Handling for Sign Up API
  static Future<Map<String, dynamic>> signUp({
    required String Email,
    required String Password,
  }) async {
    try {
      final Uri uri = Uri.parse('$baseUrl/api/createRSO');
      final Map<String, String> requestBody = {
        'Email': Email,
        'Password': Password,
        'UniID': "6556dbfdd57c4bacf73267a0",
      };
      final response = await http.put(
        uri,
        body: jsonEncode(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Sign-up failed with status code: ${response.statusCode}');
      }
    }
    catch (e) {
      print('Error during sign-up: $e');
      return {'success': false, 'error': 'Failed to sign up'};
    }
  }

  static Future<bool> checkRSOFields(String token) async {
    final Uri uri = Uri.parse('$baseUrl/api/checkRSOFields');
    
    final response = await http.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final dynamic jsonResponse = jsonDecode(response.body);
      if (jsonResponse is Map<String, dynamic> && jsonResponse.containsKey('fieldsNotEmpty')) {
        return jsonResponse['fieldsNotEmpty'] as bool;
      } else {
        throw Exception('Invalid response format. Expected "fieldsNotEmpty" boolean value.');
      }
    } else {
      throw Exception('Check RSO Fields failed with status code: ${response.statusCode}');
    }
  }

  static Future<Map<String, dynamic>> updateRSOInfo({
    required String token,
    required String RSOName,
    required String OfficerFirstName,
    required String OfficerLastName,
    required String OfficerEmail,
    required String Phone,
    required String AdvisorName,
    required String AdvisorEmail,
    required String SecondaryContactName,
    required String SecondaryContactEmail,
    required String SecondaryContactPhone,
  }) async {
    final Uri uri = Uri.parse('$baseUrl/api/updateRSOInfo');
    
    final Map<String, String> requestBody = {
      'RSOName': RSOName,
      'OfficerFirstName': OfficerFirstName,
      'OfficerLastName': OfficerLastName,
      'OfficerEmail': OfficerEmail,
      'Phone': Phone,
      'AdvisorName': AdvisorName,
      'AdvisorEmail': AdvisorEmail,
      'SecondaryContactName': SecondaryContactName,
      'SecondaryContactEmail': SecondaryContactEmail,
      'SecondaryContactPhone': SecondaryContactPhone,
    };
    final response = await http.post(
      uri,
      body: jsonEncode(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      // Assuming the response contains a boolean value indicating success
      final Map<String, dynamic> responseBody = jsonDecode(response.body);
      if (responseBody.containsKey('success') && responseBody['success'] == true) {
        return responseBody;
      } else {
        throw Exception('Update RSO Info failed. Unexpected response format.');
      }
    } else {
      throw Exception('Update RSO Info failed with status code: ${response.statusCode}');
    }
  }

  // Handling for Search Rooms API
  static Future<Map<String, dynamic>> retrieveRooms(String latitude, String longitude) async {
    const String uri = "$baseUrl/api/RetrieveRooms";

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

  static Future<Map<String, dynamic>> retrieveEvents({String? rsoId}) async {
    final Map<String, dynamic> requestBody = {'RSOID': rsoId};

    final response = await http.post(
      Uri.parse('$baseUrl/api/RetrieveEvents'),
      body: jsonEncode(requestBody),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to retrieve events');
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
        Uri.parse('$baseUrl/api/createEvent'),
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
