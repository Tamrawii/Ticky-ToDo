import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const CelebrationScreen = () => {
  return (
    <ConfettiCannon
      count={200}
      origin={{ x: -10, y: 0 }}
    />
  );
};

export default CelebrationScreen;
