import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styles from '../Styles/HomeCampingStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };
const defaultProfilePic = require('../ASSET/profil.jpg');

type HomeCampingProps = {
  route: RouteProp<RootStackParamList, 'HomeCamping'> & {
    params: {
      userId: number;
      userName: string;
      campingName: string;
      idCamping: number;
    };
  };
};

function HomeCamping({ route }: HomeCampingProps) {
  const { campingName, idCamping, userId, userName } = route.params;
  const [userPhoto, setUserPhoto] = useState(defaultProfilePic);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Charger les informations de l'utilisateur (logique à implémenter)
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.profilePicContainer}>
            <Image source={userPhoto} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>{userName}</Text>
          <Text style={styles.welcomeText}>Bienvenue au {campingName}</Text>
          <View style={styles.cardContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ViewPlanningCamping', { campingName, idCamping })}
            >
              <Text style={styles.buttonText}>Voir planning Camping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ActivityRoom', { idCamping, userId })}
            >
              <Text style={styles.buttonText}>Voir activité vacancier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeCamping;
