import { View, ScrollView, TextInput, StyleSheet, Text, Image, Modal, Pressable, Button, Animated, Easing } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';

export default function CardInputScreen() {
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [fullName, setFullName] = useState('');
  const [userName, setUsername] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [emailAdress, setEmailAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [errors, setErrors] = useState<ErrorsType>({});
  const [errorMessage, setErrorMessage] = useState('');

  // Add typ boolean for if a field is written in 
  type ErrorsType = {
    fullName?: boolean;
    userName?: boolean;
    emailAdress?: boolean;
    phoneNumber?: boolean;
    password?: boolean;
    isChecked?: boolean;
  };
  
  //Function for validating that all essentil field are filled in
  const validateAndSubmit = () => {
    const newErrors: ErrorsType = {};

    //Find error
    if (!fullName.trim()) newErrors.fullName = true;
    if (!userName.trim()) newErrors.userName = true;
    if (!password.trim()) newErrors.password = true;
    if (!isChecked) newErrors.isChecked = true;

     // Conditionally validate email or phone based on selected method
    if (selectedMethod === 'email' && !emailAdress.trim()) {
      newErrors.emailAdress = true;
    }
    if (selectedMethod === 'phone' && !phoneNumber.trim()) {
      newErrors.phoneNumber = true;
    }

    //Display error massesge or sucess message
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('You need to fill in all the essential information above');
    } else {
      setErrors({});
      setErrorMessage('');
      console.log('Account successfully created');
    }
  };

  //Chech if the terms and conditions are checked
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  //text for popup windows. 
  const showMethod = () => {
    setModalText('Choose your prefered sign up method from the list');
    setModalVisible(true);
  };

  const showTerms = () => {
    setModalText('Terms of Use Agreement... please add customized text for Terms of Use Agreement');
    setModalVisible(true);
  };

  const showPrivacy = () => {
    setModalText('Privacy Policy... please add customized text for Privacy Policy');
    setModalVisible(true);
  };

  const showName = () => {
    setModalText('Enter your full name, fist name and last name');
    setModalVisible(true);
  };

  const showUsername = () => {
    setModalText('Choose a username');
    setModalVisible(true);
  };

  const showEmail = () => {
    setModalText('Enter you email adress');
    setModalVisible(true);
  };

  const showPhone = () => {
    setModalText('enter you phone number');
    setModalVisible(true);
  };

  const showGender = () => {
    setModalText('Choose your gender from the list');
    setModalVisible(true);
  };

  const showDate = () => {
    setModalText('Enter your birth date. Enter day and month with two numbers. ie, 01 01 2024 for first of january 2024');
    setModalVisible(true);
  };

  const showPassword = () => {
    setModalText('Choose a password. Combine letters and numbers, vary between uppercase and lowercase letters and include special characters for better protection. Dont share your password.');
    setModalVisible(true);
  };

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
          <Pressable onPress={showMethod}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMethod}
              onValueChange={(itemValue) => setSelectedMethod(itemValue)}
              dropdownIconColor="#ccc"
              mode="dropdown"
            >
              {selectedMethod === '' && (
                <Picker.Item label="Please select" value="" enabled={false} />
              )}

              {/* Alternatives */}
              <Picker.Item label="Email address" value="email" />
              <Picker.Item label="Phone number" value="phone" />
            </Picker>
          </View>
        </View>

        {/* Box for inputs: Full name */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}> Full name</Text>
          <Pressable onPress={showName}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
        </View>
        <TextInput
          style={[styles.input, errors.fullName && styles.errorInput]}
          value={fullName}
          onChangeText={setFullName}
        />

          {/* Box for inputs: Username */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}> Username</Text>
          <Pressable onPress={showUsername}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
        </View>
        <TextInput
          style={[styles.input, errors.userName && styles.errorInput]}
          value={userName}
          onChangeText={setUsername}
        />

          {/* Box for inputs: email or phone */}
          {selectedMethod === 'email' ? (
            <>
            <View style={styles.labelContainer}>
              <Text style={styles.label}> Email address</Text>
              <Pressable onPress={showEmail}>
              <Image source={require('../../assets/images/question.png')} style={styles.icon} />
              </Pressable>
            </View>
            <TextInput
              style={[styles.input, errors.emailAdress && styles.errorInput]}
              value={emailAdress}
              onChangeText={setEmailAdress}/>
          </>
          ) : (
          <>
            <View style={styles.labelContainer}>
              <Text style={styles.label}> Phone number</Text>
              <Pressable onPress={showPhone}>
              <Image source={require('../../assets/images/question.png')} style={styles.icon} />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}/>
          </>
          )}


          {/* Picker input for gender */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}> Gender</Text>
          <Pressable onPress={showGender}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.genderContainer}>
          <View style={styles.genderWrapper}>
            <Picker
              selectedValue={selectedGender}
              onValueChange={(itemValue) => setSelectedGender(itemValue)}
              dropdownIconColor="#ccc"
              mode="dropdown"
            >
              {selectedGender === '' && (
                <Picker.Item label="Please select" value="" enabled={false} />
              )}

              {/* Alternatives */}
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Non-binary" value="non-binary" />
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Do not want to specify" value="not-specified" />
            </Picker>
          </View>
        </View>

              {/* Box for inputs: Date of Birth */}
          <View style={styles.labelContainer}>
          <Text style={styles.label}> Date of birth</Text>
          <Pressable onPress={showDate}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
          </View>
          <View style={styles.dateContainer}>
            {/* Day */}
              <TextInput
              style={styles.dateInput}
              value={selectedDay}
              placeholder='DD'
              onChangeText={setSelectedDay}
              maxLength={2}
              />

            {/* Month */}
              <TextInput
              style={styles.dateInput}
              value={selectedMonth}
              placeholder='MM'
              onChangeText={setSelectedMonth}
              maxLength={2}
              /> 

            {/* Year */}
              <TextInput
              style={styles.dateInput}
              value={selectedYear}
              placeholder='YYYY'
              onChangeText={setSelectedYear}
              maxLength={4}
              /> 
          </View>

              {/* Box for inputs: Password */}
          <View style={styles.labelContainer}>
          <Text style={styles.label}> Password </Text>
          <Pressable onPress={showPassword}>
          <Image source={require('../../assets/images/question.png')} style={styles.icon} />
          </Pressable>
          </View>
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          {/* Checkbox for terms of use */}
          <View style={styles.checkboxContainer}>
          <Pressable onPress={toggleCheckbox} style={[styles.checkbox, errors.isChecked && styles.errorCheckbox]}>
            {isChecked && <View style={styles.checkboxTick} />}
          </Pressable>
          <Text style={styles.checkboxText}>
            I have read and accept the{' '}
            <Text style={styles.linkText} onPress={showTerms}>
              Terms of Use Agreement
            </Text>{' '}
            and consent to the{' '}
            <Text style={styles.linkText} onPress={showPrivacy}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        
        {/* Submit Button */}
        <Pressable style={styles.customButton} onPress={validateAndSubmit}>
          <Text style={styles.customButtonText}>Create Account</Text>
        </Pressable>
        
        {/* Missing inputs from user */}
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}


        </View>

        {/* Modal for popup windows*/}
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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

  // container for input fields
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


  // Input fields
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
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  //Change sign up method
     // Gender drop down menus
     pickerContainer: {
      height: 56,
      marginBottom: 16,
    },
    pickerWrapper: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 2,
      backgroundColor: '#fff',
    },


  // Birth date inout menus
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    justifyContent: 'center',
    height: 48,
    marginHorizontal: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },

    // Gender drop down menus
  genderContainer: {
    height: 56,
    marginBottom: 16,
  },
  genderWrapper: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },



  //terms of use
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: '#ff0000',
  },
  checkboxText: {
    flex: 1,
    color: '#00000',
    fontSize: 14,
  },
  linkText: {
    color: '#ff0000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },


  // Modal for popup
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Create account button
  customButton: {
    backgroundColor: '#f58282', 
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, 
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //Missing user input
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  errorCheckbox: {
    borderColor: 'red',
  },
});
