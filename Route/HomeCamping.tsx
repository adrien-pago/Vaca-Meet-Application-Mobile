import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styles from '../Styles/HomeCampingStyles';


type HomeCampingProps = {
  route: RouteProp<RootStackParamList, 'HomeCamping'>& {
    params: {
      userId: number;
      userName: string;
      campingName: string;
      idCamping: number;
    };
  };
};

const defaultProfilePic = require('../ASSET/profil.jpg');

function HomeCamping({ route }: HomeCampingProps) {
  const { campingName, idCamping, userId, userName } = route.params;
  const [userPhoto, setUserPhoto] = useState(defaultProfilePic);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Charger les informations de l'utilisateur (logique à implémenter)
  }, []);

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.profilePicContainer}>
          <Image source={userPhoto} style={styles.profilePic} />
        </TouchableOpacity>
        <Text style={styles.text}>{userName} Bienvenue au {campingName}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ViewPlanningCamping', { campingName, idCamping })}
        >
          <Text style={styles.buttonText}>Voir planning Camping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ActivityRoom', { idCamping, userId})}
        >
          <Text style={styles.buttonText}>Voir activité vacancier</Text>
        </TouchableOpacity>
      </View>
  );
}

export default HomeCamping;
