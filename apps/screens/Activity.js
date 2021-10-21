import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,Button } from 'react-native';

export default function Activity({ route, navigation }) {

    
    const onPressUserdetailHandls = ()=>{
        navigation.navigate('CreateUserDetailRecord');
    }
    const onPressUserkycHandls = ()=>{
        navigation.navigate('UserKyc');
    }
    const onPressUserCompleteProfile = ()=>{
        navigation.navigate('UserCompleteProfile');
    }

    return (
        <View style={styles.container}>
         
            <View style={styles.imagViewStyle}  >
                <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require('../assets/eazyfooterlogo.png')}
                />
            </View>

            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="User Detail"
                    onPress={onPressUserdetailHandls}
                />
            </View>
            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="User kyc Detail"
                    onPress={onPressUserkycHandls}
                />
            </View>
            <View style={{marginHorizontal:40 ,marginBottom: 140, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="User complete profile"
                    onPress={onPressUserCompleteProfile}
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