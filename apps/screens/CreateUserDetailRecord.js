import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'
import DatePicker from 'react-native-datepicker'
import { Picker } from '@react-native-picker/picker';
// var db = openDatabase({ name: 'PateintReport.db' });
var db = openDatabase({ name: DATABASE_NAME });
import countries from '../utils/countries'
import states from '../utils/states'
import cities from '../utils/cities'
import * as EmailValidator from 'email-validator';

function CreateUserDetailRecord({ route, navigation }) {

    const [userName, setUserName] = useState('John')
    const [emailId, setEmailId] = useState('abc@gmail.com')
    const [contactNumber, setContactNumber] = useState('8826420913')
    const [selectedDate, setSelectedDate] = useState("18-02-1990");
    const [address, setAddress] = useState("H no 2D 45 Fbd");
    const [pincode, setPincode] = useState("121005");
   
    const [country, setCountry] = useState(0);
    const [countryError, setCountryError] = useState('');

    const [state, setState] = useState(0);
    const [stateError, setStateError] = useState('');

    const [city, setCity] = useState(0);
    const [cityError, setCityError] = useState('');



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
                    console.log("hi come here @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    if (res.rows.length == 0) {
                        console.log("hi come here");
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(record_id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(50), emailId VARCHAR(50), contactNumber VARCHAR(10), dob VARCHAR(100), country VARCHAR(50), state VARCHAR(50), city VARCHAR(50), address VARCHAR(500), pincode state VARCHAR(6) )',
                            []
                        );
                    }
                }
            );
        });
    }




    const onValueChangeCountry = (itemValue, itemIndex) => {
        setCountry(itemValue);
        if (itemValue === 0) {
            setCountryError("Please Choose country")
        } else {
            setCountryError(null)
        }
    }


    const onValueChangeState = (itemValue, itemIndex) => {
        setState(itemValue);
        if (itemValue === 0) {
            setStateError("Please Choose state")
        } else {
            setStateError(null)
        }
    }
    
    const onValueChangeCity = (itemValue, itemIndex) => {
        setCity(itemValue);
        if (itemValue === 0) {
            setCityError("Please Choose city")
        } else {
            setCityError(null)
        }        
    }

    const onViewReport = () => {
        // alert(" come ")  
        navigation.push('ReportScreen')
    }
    
    
    const onPressCreateUserDetailRecord =   () =>{
        
        console.log("Sourabh______________ userName ", userName);
        console.log("Sourabh______________ emailId ", emailId);
      

        if(userName == ''){
            alert('user name cannot be empty')
            return
        } else if (emailId == ''){
            alert('emailId cannot be empty')
            return;
        } else if(! EmailValidator.validate(emailId)){
            alert('emailId is invalid')
            return;
        }else if(contactNumber === ''){
           alert("please select Contact Number")
           return
        }else if(selectedDate === ''){
           alert("please select dob first")
           return
        }else if(country ==0){
            alert("please select country")
            return
        }else if(state ==0){
            alert("please select state")
            return
        }else if(city ==0){
            alert("please select city")
            return
        }else if(address ==""){
            alert("please select Address")
            return
        }else if(pincode ==""){
            alert("please select pincode")
            return
        }


        console.log('Results____________Sourabh  _________  123789123789123  ');
        
        
        db.transaction(function (tx) {
            
            console.log('Results____________Sourabh  _____ inside db');

            tx.executeSql(
                'INSERT INTO table_user (userName, emailId, contactNumber, dob, country, state, city, address, pincode) VALUES (?,?,?,?,?,?,?,?,?)',
                [userName, emailId, contactNumber, selectedDate,country,state,city,address,pincode],
                (tx, results) => {
                    console.log('Results____________Sourabh  _________ cretare', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log("Sourabh    hi")
                        setSelectedDate('');
                        Alert.alert(
                            'Success!',
                            'Create user detail Record Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.push('ReportScreen'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Registration Failed')
                    };
                }
            );

            console.log('Results____________Sourabh  _____ out sidce   db');

        });
    }


    return (
        <ScrollView style={{ marginTop: 40 }}>




            <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'User name '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    placeholder={'like John'}
                    onChangeText={text => setUserName(text)}
                    value={userName}
                    defaultValue={userName}
                    secureTextEntry={false}
                />
            </View>


            <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Email Id  '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    placeholder={'like john@gmail.com'}
                    onChangeText={text => setEmailId(text)}
                    value={emailId}
                    defaultValue={emailId}
                    secureTextEntry={false}
                />
            </View>


            <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Contact no '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    placeholder={'like 9654******'}
                    maxLength={10}
                    value={contactNumber}
                    onChangeText={text => setContactNumber(text)}
                    defaultValue={contactNumber}
                    secureTextEntry={false}
                />
            </View>

            <View style={{ padding: 10, }}>
                <Text style={{ marginLeft: 32 }}>{'DOB '}</Text>
                <DatePicker
                    style={{ marginLeft: 30 }}
                    date={selectedDate}
                    maxDate={new Date()}
                    onDateChange={(date) => { setSelectedDate(date) }}
                />
            </View>
            <Text style={{ marginLeft: 32 }}>{'Country  1231'}</Text>
            <View style={{ flex: 1, marginLeft:30, width: '85%', borderWidth: 0.5, borderRadius: 5, paddingLeft: 5, marginHorizontal: 5, marginVertical: 5, }}>

                <Picker
                    selectedValue={country}
                    // itemStyle={{ textAlign: 'left', fontSize: 16 }}
                    // placeholderTextColor={colors.gray50}
                    itemStyle={{ height: 50, fontSize: 16 }}
                    style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => { onValueChangeCountry(itemValue, itemIndex) }}
                >
                    <Picker.Item label={'Please Choose country'} value={0} />

                    {countries && countries.map((item) => {
                        return (
                            <Picker.Item key={item.code} label={item.name} value={item.code} />
                        )
                    }
                    )}
                </Picker>

            </View>

            {!!countryError && (
                <Text style={{ color: 'red', marginLeft: 35, fontSize: 16 }}>
                    {countryError}
                </Text>
            )}

            <Text style={{ marginLeft: 32 }}>{'State'}</Text>
            <View style={{ flex: 1, marginLeft:30, width: '85%', borderWidth: 0.5, borderRadius: 5, paddingLeft: 5, marginHorizontal: 5, marginVertical: 5, }}>

                <Picker
                    selectedValue={state}
                    // itemStyle={{ textAlign: 'left', fontSize: 16 }}
                    // placeholderTextColor={colors.gray50}
                    itemStyle={{ height: 50, fontSize: 16 }}
                    style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => { onValueChangeState(itemValue, itemIndex) }}
                >
                    <Picker.Item label={'Please Choose State'} value={0} />

                    {states && states.map((item) => {
                        return (
                            <Picker.Item key={item.key} label={item.name} value={item.key} />
                        )
                    }
                    )}
                </Picker>

            </View>

            {!!stateError && (
                <Text style={{ color: 'red', marginLeft: 35, fontSize: 16 }}>
                    {stateError}
                </Text>
            )}


            <Text style={{ marginLeft: 32 }}>{'City'}</Text>
            <View style={{ flex: 1, marginLeft:30, width: '85%', borderWidth: 0.5, borderRadius: 5, paddingLeft: 5, marginHorizontal: 5, marginVertical: 5, }}>

                <Picker
                    selectedValue={city}
                    // itemStyle={{ textAlign: 'left', fontSize: 16 }}
                    // placeholderTextColor={colors.gray50}
                    itemStyle={{ height: 50, fontSize: 16 }}
                    style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => { onValueChangeCity(itemValue, itemIndex) }}
                >
                    <Picker.Item label={'Please Choose city'} value={0} />

                    {cities && cities.map((item) => {
                        return (
                            <Picker.Item key={item.id} label={item.name} value={item.id} />
                        )
                    }
                    )}
                </Picker>

            </View>

            {!!cityError && (
                <Text style={{ color: 'red', marginLeft: 35, fontSize: 16 }}>
                    {cityError}
                </Text>
            )}

            <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Address'}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    placeholder={'like H no 1212 fbd'}
                    value={address}
                    onChangeText={text => setAddress(text)}
                    defaultValue={address}
                />
            </View>


            <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Pin Code'}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    placeholder={'like 121004'}
                    secureTextEntry={false}
                    maxLength={6}
                    value={pincode}
                    onChangeText={text => setPincode(text)}
                    defaultValue={pincode}
                />
            </View>




            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                    color='#228B22'
                    title="Create record"
                    onPress={onPressCreateUserDetailRecord}
                />
            </View>

            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                    color='#32CD32'
                    title="View report"
                    onPress={onViewReport}
                />
            </View>

        </ScrollView>
    );
}

export default CreateUserDetailRecord