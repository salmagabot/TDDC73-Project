import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Profile from './profile';

export default function TabTwoScreen() {
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'phone'>('email');

  return (
    <ScrollView style={styles.fullContainer} contentContainerStyle={styles.scrollContainer}>
      
      {/* Box for title and title image */}
      <View style={styles.titleWrapper}> 
      {selectedMethod === 'email' ? (
          <>
            <Text style={styles.title}>Join with your email address</Text>
            <Image source={require('../../assets/images/email.png')} style={styles.emailImage} />
          </>
        ) : (
          <>
            <Text style={styles.title}>Join with your phone number</Text>
            <Image source={require('../../assets/images/phone.png')} style={styles.emailImage} />
          </>
        )}
      </View>

      
      <View style={styles.whiteContainer}>
        {/* Choose login method - picker */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}> Change sign in method</Text>
        </View>

          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMethod}
              onValueChange={(itemValue) => setSelectedMethod(itemValue as 'email' | 'phone')}
              dropdownIconColor="#ccc"
              mode="dropdown"
            >
              {/* Alternatives */}
              <Picker.Item label="Email address" value="email" />
              <Picker.Item label="Phone number" value="phone" />
            </Picker>
            </View>
          </View>

      <Profile selectedMethod={selectedMethod}/>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
      backgroundColor: '#f58282',
      marginTop: 20,
      marginBottom: 20,
    },
    scrollContainer: {
      flexGrow: 1,
    },

        // container for profile
  whiteContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, //shadow
    marginBottom: 40,
  },
        // Title
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 20,
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 60,
  },
  emailImage: {
    width: 110,
    height: 110,
    marginRight: 10,
  },

  // Method picker
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },

  //Change sign up method
     pickerContainer: {
      height: 56,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pickerWrapper: {
      height: 50,
      width: 200,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 2,
      backgroundColor: '#fff',
    },
});
