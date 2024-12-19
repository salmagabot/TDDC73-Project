// app/component/carousel.tsx
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

// Define the props for the Carousel component
interface CarouselProps {
  images: any[]; // Array of images (local `require` assets)
  onSelect: (selectedImage: any) => void; // Callback function triggered when an image is selected
}

const Carousel: React.FC<CarouselProps> = ({ images, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // Track the currently selected image index

  // Handle the Next button click
  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % images.length; // Move to the next image (wrap around if at the end)
    setSelectedIndex(nextIndex);
    onSelect(images[nextIndex]); // Trigger the callback with the new image
  };

  // Handle the Back button click
  const handleBack = () => {
    const prevIndex = (selectedIndex - 1 + images.length) % images.length; // Move to the previous image (wrap around if at the beginning)
    setSelectedIndex(prevIndex);
    onSelect(images[prevIndex]); // Trigger the callback with the new image
  };

  // Determine the three images to display (center and two adjacent)
  const visibleImages = [
    images[(selectedIndex - 1 + images.length) % images.length], // Previous image
    images[selectedIndex], // Center (current) image
    images[(selectedIndex + 1) % images.length], // Next image
  ];

  return (
    <View style={styles.container}>
      {/* Display the images in a row */}
      <View style={styles.carouselContainer}>
        {visibleImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[
              styles.image,
              index === 1 && styles.centerImage, // Highlight the center image
            ]}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleBack} style={[styles.button, styles.redButton]}>
          <Text style={styles.buttonText}>{'<'}</Text> {/* Back button*/}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button, styles.redButton]}>
          <Text style={styles.buttonText}>{'>'}</Text> {/* Next button*/}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 5,
    opacity: 0.5,
  },
  centerImage: {
    width: 150,
    height: 150,
    opacity: 1,
    borderColor: 'red',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Carousel;
