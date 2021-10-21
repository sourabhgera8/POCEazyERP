import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ route, navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Activity');
        }, 1000);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {"Eazy ERP"}
            </Text>

            <View style={styles.imagViewStyle}  >
                <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require('../assets/eazyfooterlogo.png')}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    textStyle: {
        marginTop: 20,
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40
    },
    imagViewStyle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: { 
        justifyContent: 'center',
        alignItems: 'center',
    }
});