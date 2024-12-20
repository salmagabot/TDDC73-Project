// app/index.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Carousel from './Carousel';

// Images for Option 1
const option1Images = [
    require('../assets/test/images/b4.png'),
    require('../assets/test/images/b5.png'),
    require('../assets/test/images/b6.png'),
    require('../assets/test/images/b7.png'),
    require('../assets/test/images/b8.png'),
];

// Images for Option 2
const option2Images = [
    require('../assets/test/images/b9.png'),
    require('../assets/test/images/b10.png'),
    require('../assets/test/images/b11.png'),
    require('../assets/test/images/b12.png'),
    require('../assets/test/images/b13.png'),
];

const App = () => {
  // State for selected picker option
  const [selectedOption, setSelectedOption] = useState('option1');
  // State for selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Determine which set of images to display based on the selected option
  const images = selectedOption === 'option1' ? option1Images : option2Images;

  // Callback function triggered when an image is selected in the carousel
  const handleImageSelect = (image: any) => {
    setSelectedImage(image); // Update the selected image
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Image Carousel</Text>

      {/* Picker to switch between options */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
      </Picker>

      {/* Carousel component */}
      <Carousel images={images} onSelect={handleImageSelect} />

      {/* Display selected image information */}
      {selectedImage && <Text style={styles.selectedText}>Selected Image</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    width: '80%',
    height: 50,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;
