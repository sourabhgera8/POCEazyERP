import React, { useState, useEffect } from 'react';
import { View,Text, TextInput,Button,Alert, ScrollView } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'

// var db = openDatabase({ name: 'PateintReport.db' });
var db = openDatabase({ name: DATABASE_NAME });


function UserKyc({ route, navigation }) {

    const[lowbp, setLowbp] = useState('')
    const[highbp , setHighbp] = useState('')
    const[sugar, setSugar] = useState('')
    const [selectedDate, setSelectedDate] = useState("");


    useEffect(() => {
        createTable();
       
    }, [])

    

    
    function createTable() {
        console.log('data', db)
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.item(0));
                    console.log("hi come here");
                    if (res.rows.length == 0) {
                        console.log("hi come here");
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(record_id INTEGER PRIMARY KEY AUTOINCREMENT, low_Bp INT(3), high_Bp INT(3), sugar INT(3), recordDate VARCHAR(100))',
                            []
                        );
                    }
                }
            );
        });
    }

    const onViewReport = () => {     
        // alert(" come ")  
        navigation.push('ReportScreen')
    }
    const handleClick = () => {       
      console.log("K______", lowbp);
      console.log("K______", highbp);
      console.log("K______", sugar);
      console.log("K______", selectedDate);

      if(lowbp ===''){
        alert(' Low bp cannot be blank');
        return;
      }else if(highbp ===''){
        alert(' High Bp cannot be blank');
        return;
      }else if(sugar ===''){
        alert(' Sugar cannot be blank');
        return;
      }else if(selectedDate ==='' ){
        alert(' date cannot be blank');
        return;
      }

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (low_Bp, high_Bp, sugar,recordDate) VALUES (?,?,?,?)',
          [lowbp,highbp,sugar,selectedDate],
          (tx, results) => {
            console.log('Results_____________________ cretare', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log("hi")
              setLowbp('');
              setHighbp('');
              setSugar('');
              setSelectedDate('');
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.push('ReportScreen'),
                    // onPress: () => {alert(" 22222")}
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
          }
        );
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
                   
                />
            </View>

           

            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="Submits"
                    onPress={onViewReport}
                />
            </View>

         </ScrollView>
    );
}

export default UserKyc