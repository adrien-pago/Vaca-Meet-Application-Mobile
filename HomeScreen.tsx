import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HomeScreenStyle from './HomeScreenStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

type Camping = {
  id: number;
  nom_camping: string;
};

type HomeScreenProps = {
  route: {
    params: {
      userId: number;
      userName: string;
    };
  };
};

function HomeScreen({ route }: HomeScreenProps) {
  const { userId, userName } = route.params;
  const [campings, setCampings] = useState<Camping[]>([]);
  const [selectedCamping, setSelectedCamping] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    loadCampings();
    loadUserProfile(userId);
  }, []);

  ////////// Fonction charger les camping dans la combo /////////////////
  const loadCampings = async () => {
    try {
        const response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/NomCampingCombo.php');
        const data = await response.json();
        setCampings(data);
    } catch (error) {
        console.error(error);
        Alert.alert("Erreur de chargement", "Impossible de charger les campings.");
    }
};

  ////////// Fonction charger la photo de profil  /////////////////
  const loadUserProfile = async (userId: number) => {
    // Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  ////////// Fonction Modifier photo de profile /////////////////
  const handleProfilePicChange = async () => {
    // Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  ////////// Fonction Connexion au camping /////////////////
  const handleConnectToCamping = async () => {
    // Gérer la connexion de l'utilisateur au camping sélectionné avec le mot de passe fourni
  };

  //////////////////////////////   Page ////////////////////////////////////////////////////
  return (
    <ImageBackground source={backgroundImage} style={HomeScreenStyle.backgroundImage}>
        <View style={HomeScreenStyle.container}>
            {/* Photo de profil */}
            <TouchableOpacity style={HomeScreenStyle.profilePicContainer} onPress={handleProfilePicChange}>
                <Image source={userPhoto ? { uri: userPhoto } : require('./ASSET/profil.jpg')} style={HomeScreenStyle.profilePic} />
            </TouchableOpacity>

            {/* Assurez-vous que tout le texte est dans un composant <Text> */}
            <Text style={HomeScreenStyle.userName}>{userName}</Text>

            <View style={HomeScreenStyle.frameContainer}>
                <Text style={HomeScreenStyle.label}>Choisissez votre camping :</Text>
                <Picker
                    selectedValue={selectedCamping}
                    style={HomeScreenStyle.picker}
                    onValueChange={(itemValue) => setSelectedCamping(itemValue)}
                >
                    {campings.map(camping => (
                        <Picker.Item key={camping.id} label={camping.nom_camping} value={camping.nom_camping} />
                    ))}
                </Picker>

                <TextInput style={HomeScreenStyle.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />

                <TouchableOpacity style={HomeScreenStyle.button} onPress={handleConnectToCamping}>
                    <Text style={HomeScreenStyle.buttonText}>Se connecter au camping</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}

export default HomeScreen;