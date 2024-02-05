import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';
import { PlanningEvent } from './types';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    </ImageBackground>
);


export default ActivityRoom;