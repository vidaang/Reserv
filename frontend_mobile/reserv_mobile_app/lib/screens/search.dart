import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../widgets/search/buildings.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'dart:async';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String _mapStyle = '';
  GoogleMapController? _mapController;

  @override
  initState() {
    super.initState();
    rootBundle.loadString('assets/map_style.txt').then((string) {
      _mapStyle = string;
    });
  }

  Future<void> _loadMapStyle() async {
    _mapStyle = await rootBundle.loadString('assets/map_style.txt');
  }

  _onMapCreated(GoogleMapController controller) {
    if (mounted)
      setState(() {
        _mapController = controller;
        controller.setMapStyle(_mapStyle);
      });
  }
  
  static const _initialCameraPosition = CameraPosition(
    target: LatLng(28.602333068847656, -81.20020294189453),
    zoom: 16,
  );

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      initialCameraPosition: _initialCameraPosition,
      onMapCreated: _onMapCreated,
      // polylines: Set<Polyline>.of(_polyLines.values),
      myLocationEnabled: true,
      myLocationButtonEnabled: false,
      mapType: MapType.normal,
      compassEnabled: true,
      markers: Set.from(
        buildingbuildings.map(
          (building) => Marker(
            markerId: MarkerId(building.buildingId),
            position: building.position,
            infoWindow: InfoWindow(
              title: building.title,
              snippet: building.snippet,
            ),
            // onTap: () {
            //   // Navigate to DetailsPage when building is tapped
            //   Navigator.push(
            //     context,
            //     MaterialPageRoute(
            //       builder: (context) => DetailsPage(
            //         title: building.title,
            //         snippet: building.snippet,
            //       ),
            //     ),
            //   );
            // },
          ),
        ),
      ),
    );
  }
}