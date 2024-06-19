import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Geojson, Marker, Callout } from 'react-native-maps';
import polygons from './points'; // Import your polygons data

const MapScreen = () => {
  const [selectedPolygon, setSelectedPolygon] = useState(null);

  // Function to handle polygon click
  const handlePolygonClick = (polygon) => {
    setSelectedPolygon(polygon);
  };

  // Function to calculate centroid of a polygon
  const calculateCentroid = (polygon) => {
    const coordinates = polygon.coordinates[0]; // Assuming the first ring is the outer boundary
    let latSum = 0;
    let lonSum = 0;
    const numCoords = coordinates.length;

    coordinates.forEach(([lat, lon]) => {
      latSum += lat;
      lonSum += lon;
    });

    return {
      latitude: latSum / numCoords,
      longitude: lonSum / numCoords,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -6.181596,
          longitude: 35.747108,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}

        
      >
        {polygons.map((polygon, index) => {
          const centroid = calculateCentroid(polygon);
          return (
            <React.Fragment key={index}>
              {selectedPolygon === null && ( // Render markers only if no polygon is selected
                <Marker
                  coordinate={centroid}
                  onPress={() => handlePolygonClick(polygon)}
                  title={polygon.name}
                />
              )}
              <Geojson
                geojson={{
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Polygon',
                        coordinates: polygon.coordinates,
                      },
                      properties: {
                        name: polygon.name,
                      },
                    },
                  ],
                }}
                strokeColor="#1A5276"
                fillColor="#5499C7"
                strokeWidth={2}
              />
            </React.Fragment>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
