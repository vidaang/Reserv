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
];
