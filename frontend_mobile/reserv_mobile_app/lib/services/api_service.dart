// ignore_for_file: non_constant_identifier_names

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'jwt_token.dart';

class ApiService {
  static const String baseUrl =
      "https://knightsreserv-00cde8777914.herokuapp.com";
  // Handling for Login API

  static Future<Map<String, dynamic>> login(
      String Email, String Password) async {
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
        throw Exception(
            'Sign-up failed with status code: ${response.statusCode}');
      }
    } catch (e) {
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
      if (jsonResponse is Map<String, dynamic> &&
          jsonResponse.containsKey('fieldsNotEmpty')) {
        return jsonResponse['fieldsNotEmpty'] as bool;
      } else {
        throw Exception(
            'Invalid response format. Expected "fieldsNotEmpty" boolean value.');
      }
    } else {
      throw Exception(
          'Check RSO Fields failed with status code: ${response.statusCode}');
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
      if (responseBody.containsKey('success') &&
          responseBody['success'] == true) {
        return responseBody;
      } else {
        throw Exception('Update RSO Info failed. Unexpected response format.');
      }
    } else {
      throw Exception(
          'Update RSO Info failed with status code: ${response.statusCode}');
    }
  }

  // Handling for Search Rooms API
  static Future<Map<String, dynamic>> retrieveRooms(
      double latitude, double longitude) async {
    const String uri = "$baseUrl/api/RetrieveRooms";

    final Map<String, dynamic> requestBody = {
      'Latitude': latitude,
      'Longitude': longitude,
    };

    final response = await http.post(
      Uri.parse(uri),
      body: json.encode(requestBody),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to retrieve rooms: ${response.statusCode}');
    }
  }

  static Future<Map<String, dynamic>> getAvailability(
    String roomID,
    String date,
    int intervals,
    String? token,
  ) async {
    // Construct the API endpoint URL
    final apiUrl = "$baseUrl/api/availability/$roomID/$date/$intervals";

    try {
      if (token == null) {
        // Handle the case where the token is not available
        throw Exception('JWT token not available');
      }

      // Make the API request with the JWT token in the headers
      final response = await http.get(
        Uri.parse(apiUrl),
        headers: {'Authorization': 'Bearer $token'},
      );

      print('Response Body: ${response.body}');

      if (response.statusCode == 200) {
        // Parse the response JSON
        List<Map<String, num>> availabilityList =
            (json.decode(response.body)['continuousAvailability']
                    as List<dynamic>)
                .map((dynamic item) => {
                      'start': item['start'] as num,
                      'end': item['end'] as num,
                    })
                .toList();

        // Process the parsed data as needed
        List<List<num>> unformatted = [];
        List<String> timesFormatted = [];

        for (Map<String, num> availability in availabilityList) {
          num start = availability['start']!;
          num end = availability['end']!;

          DateTime startTime =
              DateTime(2023, 1, 1, start.floor(), (start % 1 * 60).round());
          DateTime endTime =
              DateTime(2023, 1, 1, end.floor(), (end % 1 * 60).round());

          String formattedSlot =
              '${DateFormat.jm().format(startTime)} - ${DateFormat.jm().format(endTime)}';

          unformatted.add([start, end]);
          timesFormatted.add(formattedSlot);
        }

        // Return the parsed data in a Map (you can modify this based on your needs)
        return {
          'unformatted': unformatted,
          'formatted': timesFormatted,
        };
      } else {
        // If the server did not return a 200 OK response,
        // throw an exception with the error message.
        throw Exception(
            'Failed to load availability. Status code: ${response.statusCode}');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      throw Exception('Failed to create availability: $error');
    }
  }

  static Future<Map<String, dynamic>> retrieveEvents(String? token) async {
    try {
      if (token == null) {
        throw Exception('JWT token not available');
      }

      if (token == "") {
        throw Exception('JWT token is empty');
      }
      final response = await http.post(
        Uri.parse('$baseUrl/api/RetrieveEventsMobile'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('EVENTS WACK GO FIX IT DUMMY CODER!');
      }
    } catch (e) {
      throw Exception('Failed to retrieve event. Error: $e');
    }
  }

  static Future<void> deleteEvent(String eventID) async {
    //final url = Uri.parse('http://localhost:5000/api/DeleteEvent');
    final url = Uri.parse(baseUrl + '/api/DeleteEvent');
    
    try {
      final response = await http.delete(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'EventID': eventID}),
      );

      if (response.statusCode == 200) {
        print('Event deleted successfully');
      } else {
        print('Failed to delete event. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
      }
    } catch (e) {
      print('Error deleting event: $e');
    }
  }

  static Future<void> updateEvent(String eventID, String name, String desc) async {
    //final url = Uri.parse('http://localhost:5000/api/UpdateEvent');
    final url = Uri.parse(baseUrl + '/api/UpdateEvent');
      
    try {
      final response = await http.put(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'EventID': eventID, 'EventName': name, 'Description' : desc}),
      );

      if (response.statusCode == 200) {
        print('Event updated successfully');
      } else {
        print('Failed to update event. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
      }
    } catch (e) {
      print('Error deleting event: $e');
    }
  }

  static Future<void> createEvent(String? token,String RoomID, String Date, String EventName, 
    String EventType, String Description, int? Attendees, bool AtriumOccupy, bool MediaEquip, bool EventAgreement, 
    List<num> StartEnd, String BuildingID, int? RoomNumber) async {
    try {
      if (token == null) {
        // Handle the case where the token is not available
        throw Exception('JWT token not available');
      }

      if (token == "") {
        // Handle the case where the token is not available
        throw Exception('JWT token is empty');
      }

      Map<String, dynamic> requestBody = {
        'Date': Date,
        'EventName': EventName,
        'EventType': EventType,
        'NumAttendees': Attendees,
        'Description': Description,
        'AtriumOccupy': AtriumOccupy,
        'AtriumBuilding': false,
        'StartEnd': StartEnd,
        'EventAgreement': EventAgreement,
        'MediaEquip': MediaEquip,
        'RoomID': RoomID,
        'BuildingID': BuildingID,
        'RoomNumber': RoomNumber,
      };

      final response = await http.put(
        Uri.parse('$baseUrl/api/createEventMobile'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        print(
            'Event created successfully! Event ID: ${responseData['eventId']}');
      } else {
        throw Exception(
            'Failed to create event. Status code: ${response.statusCode}, Body: ${response.body}');
      }
    } catch (e) {
      throw Exception('Failed to create event. Error: $e');
    }
  }

  static Future<Map<String, dynamic>> retrieveRSO({
    required String uniID,
    required bool verificationFlag,
    String? rsoID,
  }) async {
    final Map<String, dynamic> requestBody = {
      'UniID': uniID,
      'VerificationFlag': verificationFlag,
      'RSOID': rsoID,
    };

    final response = await http.post(
      Uri.parse('$baseUrl/api/RetrieveRSO'),
      body: jsonEncode(requestBody),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to retrieve RSO: ${response.statusCode}');
    }
  }

  // deletes rso
  static Future<void> deleteRSO(String? rsoName) async {
    final Uri url = Uri.parse('$baseUrl/api/deleteRSO');

    final Map<String, dynamic> requestBody = {'RSOName': rsoName};

    try {
      final http.Response response = await http.delete(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print('RSO deletion successful');
      } else {
        print('Error deleting RSO: ${response.statusCode}');
        print('Error details: ${response.body}');
      }
    } catch (e) {
      print('Exception during RSO deletion: $e');
    }
  }

  static Future<Map<String, dynamic>> updateRSOLoginInfo(
      String password, String? rsoID) async {
    final String apiUrl = "$baseUrl/api/updateRSOLoginInfo";
    //final Uri url = Uri.parse('$baseUrl/api/updateRSOLoginInfo');

    final Map<String, dynamic> requestData = {
      "Password": password,
      "RSOID": rsoID,
    };

    try {
      final http.Response response = await http.post(
        Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(requestData),
      );

      if (response.statusCode == 200) {
        return {'success': true};
      } else if (response.statusCode == 400) {
        return {'error': 'No document updated. RSOID may not exist.'};
      } else {
        return {'error': 'Failed to update RSOLoginInfo'};
      }
    } catch (e) {
      return {'error': e.toString()};
    }
  }
  
  static Future<void> ForgotPassword(String Email) async {
    try {
      Map<String, dynamic> requestBody = {
        'Email': Email,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/request-password-reset'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print('Password reset email sent successfully!');
      } else {
        throw Exception('Failed to send password reset email. Status code: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to send password reset email. Error: $e');
    }
  }
}
