import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";


function MapScreen() {

    const [location, setLocation] = useState(null);
    
    useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

    return (
        <View style={styles.wrapper}>
            <MapView style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
                }}
                mapType="standard"
        minZoomLevel = {15}
        onMapReady={() => console.log("Map is ready")}
                showsUserLocation={true}
            >
                {location && (
          <Marker title="I am here" coordinate={location} description="Your current position" />
        )}
        </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    }
})
export default MapScreen
