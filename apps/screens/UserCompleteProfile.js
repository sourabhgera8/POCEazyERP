import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import countries from '../utils/countries'

function UserCompleteProfile({ route, navigation }) {

  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationSelected, setLocationSelected] = useState({});
  

  useEffect(() => {
    fetch('https://aboutreact.herokuapp.com/getpost.php?offset=1')
      .then((res) => res.json())
      .then((json) => {
        const { results: films } = json;
        // setFilms(films);

        setLocations(films);
        //setting the data in the films state
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  
  const onChangeTextLocation = (text) => {

    console.log("S___________ text ", text);
    console.log("S___________ locations ", locations);

    setLocation(text);
    findLocationQuery(text);
    setLocationSelected({});

    // if (text.trim() === "") {
    //   setLocationError("Please select / enter any yard location.")
    // } else {
    //   setLocationError(null)
    // }
  }

  const findLocationQuery = (query) => {
    // Method called every time when we change the value of the input

    try {
      if (query) {
        // setLocationViewOpen(true);
        // Making a case insensitive regular expression
        const regex = new RegExp(`${query.trim()}`, 'i');
        // Setting the filtered film array according the query           
        // setFilteredLocations(locations.filter((item) => item.LocationName && item.LocationName.search(regex) >= 0));
        
        // console.log("resultttttttt   query   22121--- "+ query);
        // console.log("resultttttttt   typeof locations--- "+ typeof locations);

        // locations.filter((item) => {
        //   const {title} = item;
        //   console.log("resultttttttt   item.name   --- "+  title);
        //   console.log("resultttttttt    KK    --- "+  title && title.match(regex) >= 0 );
        //   // console.log("resultttttttt   item.name   --- "+  item);
        //   // console.log("resultttttttt    KK    --- "+  item.name && item.name.match(regex) >= 0 );
        // })

        // setFilteredLocations(locations.filter((item) => item.name && item.name.match(regex) >= 0));
        
        setFilteredLocations(locations.filter((item) => item.title.search(regex) >= 0) );
        
      } else {
        // setLocationViewOpen(false);
        // If the query is null then return blank
        setFilteredLocations([]);
      }
    } catch (error) {
      // setLocationViewOpen(false);
      // If the query is null then return blank
      setFilteredLocations([]);
    }
  };


  console.log("filteredLocations ", filteredLocations);
  return (
    <View style={{ flex:1,marginTop: 40, backgroundColor:'grey' }}>

      
      <View style={{ height: 50, marginHorizontal: 25,  flex: 1, borderRadius: 5, borderWidth: 0.5, margin: 5, zIndex: 6, backgroundColor: '#c1e2dd' }}>

        {<Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          // hideResults={!filteredLocations.length > 0}
          listStyle={{ maxHeight: 155, height: 'auto', zIndex: 10 }}
          containerStyle={{ flex: 1, zIndex: 10, height: 'auto' }}
          style={{ paddingLeft: 10, height: 48 }}
          data={locations}
          // defaultValue={
          //   JSON.stringify(filteredLocations) === '{}' ?
          //     '' :
          //     location
          //   // filteredLocations.Text
          // }
          onChangeText={(text) => { onChangeTextLocation(text) }}
          placeholder="Yard Location"
          placeholderTextColor={'black'}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1,width: '100%',}}
              onPress={() => {
                setLocationSelected(item);
                setLocation(item.name);
                setFilteredLocations([]);
              }}>
              <Text style={{ flex: 1, width: '100%', fontSize: 15, paddingTop: 5, margin: 2,paddingLeft: 5}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.name}

        />}
      </View>


    </View>
  );
}

export default UserCompleteProfile