import 'dart:collection';
import '../../services/api_service.dart';
import '../../services/jwt_token.dart';

final ApiService apiService = ApiService();
Map<String, dynamic> rsoInfo = new Map<String, dynamic>();

Future<void> fetchData() async {
    try {
      String? RSOID = await JWTToken.getToken('RSOID');
      Map<String, dynamic> result = await ApiService.retrieveRSO(
        uniID: '655673b363bf110ce2b499ee',
        verificationFlag: true,
        rsoID: RSOID,
      );
      print('RSO retrieved successfully: $result');
      setData(result);  
    } catch (e) {
      // Handle exceptions
      print('Error retrieving RSO: $e');
    }
}

void setData(Map<String, dynamic> data)  {
    rsoInfo = data;
}

Future<void> updatePassword(String password) async {
  try{
    String? RSOID = await JWTToken.getToken('RSOID');
 await ApiService.updateRSOLoginInfo(password, RSOID)
    .then((result) {
  if (result.containsKey('success')) {
    print('RSOLoginInfo updated successfully');
  } else if (result.containsKey('error')) {
    print('Error: ${result['error']}');
  }
});
  } catch(e){
    // Handle exceptions
      print('Error updating password for RSO: $e');
  }

}