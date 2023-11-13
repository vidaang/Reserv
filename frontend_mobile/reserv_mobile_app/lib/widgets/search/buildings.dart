// contains markers of all the buildings available to book on campus
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Building {
  final String buildingId;
  final LatLng position;
  final String title;
  final String snippet;

  Building({
    required this.buildingId,
    required this.position,
    required this.title,
    required this.snippet,
  });
}

final List<Building> buildingbuildings = [
  Building(
    buildingId: 'ARNA',
    position: const LatLng(28.607441, -81.197329),
    title: 'ARNA - Addition Financial Arena',
    snippet: 'Description for Addition Financial Arena',
  ),
  Building(
    buildingId: 'BA1',
    position: const LatLng(28.601151, -81.199169),
    title: 'BA1 - Business Administration I',
    snippet: 'Description for Business Administration I',
  ),
  Building(
    buildingId: 'BHC',
    position: const LatLng(28.602302, -81.20202),
    title: 'BHC - Burnett Honors College',
    snippet: 'Description for Burnett Honors College',
  ),
  Building(
    buildingId: 'BIO',
    position: const LatLng(28.600067, -81.198576),
    title: 'BIO - Biological Sciences Building',
    snippet: 'Description for Biological Sciences Building',
  ),
  Building(
    buildingId: 'CB1',
    position: const LatLng(28.60369, -81.200455),
    title: 'CB1 - Classroom Building I',
    snippet: 'Description for Classroom Building I',
  ),
  Building(
    buildingId: 'CB2',
    position: const LatLng(28.604255, -81.200146),
    title: 'CB2 - Classroom Building II',
    snippet: 'Description for Classroom Building II',
  ),
  Building(
    buildingId: 'COP',
    position: const LatLng(28.601235, -81.197064),
    title: 'COP - College of Optics & Photonics',
    snippet: 'Description for College of Optics & Photonics',
  ),
  Building(
    buildingId: 'ENG1',
    position: const LatLng(28.60142, -81.198274),
    title: 'ENG1 - Engineering I',
    snippet: 'Description for Engineering I',
  ),
  Building(
  buildingId: 'ENG2',
  position: const LatLng(28.601831, -81.198465),
  title: 'Engineering II F7',
  snippet: 'Description for Engineering II',
  ),
  Building(
    buildingId: 'FC',
    position: const LatLng(28.597932, -81.200114),
    title: 'Ferrell Commons',
    snippet: 'Description for Ferrell Commons',
  ),
  Building(
    buildingId: 'FS',
    position: const LatLng(28.608306, -81.192576),
    title: 'Bounce House',
    snippet: 'Description for Bounce House',
  ),
  Building(
    buildingId: 'GB',
    position: const LatLng(28.604671, -81.197893),
    title: 'UCF Global Building',
    snippet: 'Description for UCF Global Building',
  ),
  Building(
    buildingId: 'HEC',
    position: const LatLng(28.60056, -81.197734),
    title: 'L3Harris Engineering Center',
    snippet: 'Description for L3Harris Engineering Center',
  ),
  Building(
    buildingId: 'HS1',
    position: const LatLng(28.603112, -81.198779),
    title: 'Health Sciences I',
    snippet: 'Description for Health Sciences I',
  ),
  Building(
    buildingId: 'HS2',
    position: const LatLng(28.603144, -81.198146),
    title: 'Health Sciences II',
    snippet: 'Description for Health Sciences II',
  ),
  Building(
    buildingId: 'LIB',
    position: const LatLng(28.600257, -81.201439),
    title: 'John C. Hitt Library',
    snippet: 'Description for John C. Hitt Library',
  ),
  Building(
    buildingId: 'MH',
    position: const LatLng(28.599084, -81.202253),
    title: 'Millican Hall',
    snippet: 'Description for Millican Hall',
  ),
  Building(
    buildingId: 'MSB',
    position: const LatLng(28.59967, -81.20041),
    title: 'Mathematical Sciences Building',
    snippet: 'Description for Mathematical Sciences',
  ),
  Building(
    buildingId: 'NSCM',
    position: const LatLng(28.603955, -81.202855),
    title: 'Nicholson School of Communication',
    snippet: 'Description for Nicholson School of Communication',
  ),
  Building(
    buildingId: 'PSY',
    position: const LatLng(28.604683, -81.199468),
    title: 'Psychology Building',
    snippet: 'Description for Psychology Building',
  ),
  Building(
    buildingId: 'STUN',
    position: const LatLng(28.601949, -81.200645),
    title: 'Student Union',
    snippet: 'Description for Student Union',
  ),
  Building(
    buildingId: 'TCH',
    position: const LatLng(28.601786, -81.203246),
    title: 'Trevor Colbourn Hall',
    snippet: 'Description for Trevor Colbourn Hall',
  ),
  Building(
    buildingId: 'TH',
    position: const LatLng(28.600539, -81.19968),
    title: 'Theatre',
    snippet: 'Description for Theatre',
  ),
  Building(
    buildingId: 'VAB',
    position: const LatLng(28.602764, -81.203002),
    title: 'Visual Arts Building',
    snippet: 'Description for Visual Arts Building',
  )

];
