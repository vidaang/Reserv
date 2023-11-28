import 'package:shared_preferences/shared_preferences.dart';

class JWTToken {
  static Future<void> setToken(String key, String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(key, value);
  }

  static Future<String?> getToken(String key) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
  }

  static Future<Map<String, String?>> getTokenContents() async {
    final String? token = await getToken('Token');
    final String? rsoID = await getToken('RSOID');
    final String? uniID = await getToken('UniID');

    return {'Token': token, 'RSOID': rsoID, 'UniID': uniID};
  }
}