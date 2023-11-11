// main.dart
import 'package:flutter/material.dart';
import './screens/landing.dart';

void main() { 
  runApp(const MyApp()); 
} 
  
class MyApp extends StatelessWidget { 
  const MyApp({Key? key}) : super(key: key); 
  
  // This widget is the root of your application. 
  @override 
  Widget build(BuildContext context) { 
    return MaterialApp( 
      title: 'Reserv App', 
      debugShowCheckedModeBanner: false, 
      initialRoute: '/landing',
      routes: {
        '/landing': (context) => const LandingPage(),
      },
    ); 
  } 
}