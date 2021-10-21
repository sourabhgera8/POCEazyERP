import React from 'react';
import { View ,Text ,StyleSheet} from 'react-native';

function UserCompleteProfile() {
  
  return (
    <View style={styles.mainContainer}>

      <Text  style={styles.textCommingSoon}>
        {"Coming Soon.... "}
      </Text>

    </View>
  );
}

export default UserCompleteProfile


const styles = StyleSheet.create({
  mainContainer: {
    flex:1, 
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  textCommingSoon: {
     color:'white',
     fontSize: 18,
     fontStyle:'italic'
     
  },
});