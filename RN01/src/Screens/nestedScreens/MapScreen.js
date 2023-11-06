import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

function MapScreen({ route }) {
    const { latitude, longitude } = route.params.locationCoords
    const { locationName } = route.params

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
            }

            await Location.getCurrentPositionAsync({})
        })()
    }, [])

    return (
        <View style={styles.wrapper}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType="standard"
                minZoomLevel={15}
                showsUserLocation={true}
            >
                {latitude && longitude && (
                    <Marker
                        title={`${locationName}`}
                        coordinate={{ latitude, longitude }}
                    />
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
export default MapScreen
