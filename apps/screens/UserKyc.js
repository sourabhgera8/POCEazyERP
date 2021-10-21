import React, { useState, useEffect } from 'react';
import { View,Text, TextInput,Button,Alert, ScrollView } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'

// var db = openDatabase({ name: 'PateintReport.db' });
var db = openDatabase({ name: DATABASE_NAME });


function UserKyc({ route, navigation }) {

    const [gstNo, setGstNo] = useState('06AZMPG7542N1ZT')
    const [panNumber, setPanNumber] = useState('ATGPK1212L')
    const [aadharNumber, setAadharNumber] = useState('271245857962')
    const [drivingLicense, setDrivingLicense] = useState('Dl2055512020')
    const [voterId, setVoterId] = useState('IKR4452415')
    const [upiId, setUpiId] = useState('sonu@icici.ok')



    useEffect(() => {
        createTable();
    }, [])

    

    
    function createTable() {
      console.log("hi come here user kyc --------dsdssda------------------ ");

        console.log('data', db)
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_kyc'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.item(0));
                    console.log("hi come here user kyc -------------------------- ");
                    if (res.rows.length == 0) {
                        console.log("hi come here");
                        txn.executeSql('DROP TABLE IF EXISTS table_user_kyc', []);
                        txn.executeSql(
                            // 'CREATE TABLE IF NOT EXISTS table_user(record_id INTEGER PRIMARY KEY AUTOINCREMENT, low_Bp INT(3), high_Bp INT(3), sugar INT(3), recordDate VARCHAR(100))',
                            'CREATE TABLE IF NOT EXISTS table_user_kyc(record_kyc_id INTEGER PRIMARY KEY AUTOINCREMENT, gstNo VARCHAR(15), panNumber VARCHAR(10), aadharNumber VARCHAR(12), drivingLicense VARCHAR(15), voterId VARCHAR(15), upiId VARCHAR(50) )',
                            []
                        );
                    }
                }
            );
        });
    }

    const onPressKycReport = () => {
      // alert(" come ")  
      navigation.push('ReportKycScreen')
    }

    const onPressKycSubmit = () => {
      if (gstNo === '') {
        alert("Gst number is empty")
        return;
      } else if (panNumber === '') {
        alert("Pan Number is empty")
        return;
      } else if (aadharNumber === '') {
        alert("Aadhar Number is empty")
        return;
      } else if (drivingLicense === '') {
        alert("Driving License is empty")
        return;
      } else if (voterId === '') {
        alert("Voter Id is empty")
        return;
      } else if (upiId === '') {
        alert("Upi Id is empty")
        return;
      } 


      console.log("hSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 11111111111  ")
      db.transaction(function (tx) {
        console.log("hSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 2222222222  ")

        try{
        tx.executeSql(
          // 'INSERT INTO table_user (low_Bp, high_Bp, sugar,recordDate) VALUES (?,?,?,?)',
          'INSERT INTO table_user_kyc (gstNo, panNumber, aadharNumber, drivingLicense, voterId, upiId ) VALUES (?,?,?,?,?,?)',
          [gstNo,panNumber,aadharNumber,drivingLicense,voterId,upiId],
          (tx, results) => {
            console.log("hSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 3333  ")

            console.log('Results_____________________ cretare', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log("hi")
              
              Alert.alert(
                'Success',
                'User Kyc Detail Submitted Successfully',
                [
                  {
                    text: 'Ok',
                    // onPress: () => navigation.push('ReportScreen'),
                    onPress: () => {alert("Mr Gera are you good now Cool")}
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
            console.log("hSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 34233  ")
          }
        
          
        );
          }catch(error){
              console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrr "+ error);
          }
      });
    }


    return(
         <ScrollView style={{marginTop:40}}>
            
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Gstin no '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like 06ajcps1904l1z3'}
                    onChangeText={text => setGstNo(text)}
                    value={gstNo}
                    defaultValue={gstNo}
                />
            </View>
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Pan no '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like Azmpg7865E'}
                    onChangeText={text => setPanNumber(text)}
                    value={panNumber}
                    defaultValue={panNumber}
                />
            </View>
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Aadhar no '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like 124256859658'}
                    onChangeText={text => setAadharNumber(text)}
                    value={aadharNumber}
                    defaultValue={aadharNumber}
                   
                />
            </View>
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Driving License '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like 255/2/2011'}
                    onChangeText={text => setDrivingLicense(text)}
                    value={drivingLicense}
                    defaultValue={drivingLicense}
                   
                />
            </View>
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Voter id no '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like Ikr00024356'}
                    onChangeText={text => setVoterId(text)}
                    value={voterId}
                    defaultValue={voterId}
                />
            </View>
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Upi id '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like Sourabh@icici.com'}
                    onChangeText={text => setUpiId(text)}
                    value={upiId}
                    defaultValue={upiId}
                />
            </View>

           

            <View style={{ marginHorizontal: 40, marginTop: 10, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="Kyc Submit"
                    onPress={onPressKycSubmit}
                />
            </View>

            <View style={{ marginHorizontal: 40, marginTop: 15,marginBottom: 25, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10,  }}
                     color='#326542'
                    title="View Kyc Report"
                    onPress={onPressKycReport}
                />
            </View>

         </ScrollView>
    );
}

export default UserKyc