import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import HomeScreenStyle from '../Styles/HomeScreenStyles';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeScreen: { userId: number; userName: string };
  HomeCamping: { idCamping: number; campingName: string; userId: number; userName: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ route, navigation }: HomeScreenProps) {
  const { userId, userName } = route.params;
  const [campings, setCampings] = useState<{ id: number, nom: string }[]>([]);
  const [selectedCamping, setSelectedCamping] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadCampings();
    loadUserProfile(userId);
  }, []);

  const loadCampings = async () => {
    try {
      const response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/NomCampingCombo.php');
      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        setCampings(data);
      } catch (jsonError) {
        console.error("Erreur lors du parsing JSON:", jsonError);
        Alert.alert("Erreur de chargement", "La réponse du serveur n'est pas au format JSON attendu.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur de chargement", "Impossible de charger les campings.");
    }
  };

  const loadUserProfile = async (userId: number) => {
    // Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  const handleProfilePicChange = async () => {
    // Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  const handleConnectToCamping = async () => {
    if (!selectedCamping) {
      Alert.alert("Erreur", "Veuillez sélectionner un camping.");
      return;
    }
    const selectedCampingData = campings.find(camping => camping.id === selectedCamping);
    if (!selectedCampingData) {
      Alert.alert("Erreur", "Camping sélectionné non trouvé.");
      return;
    }

    try {
      let response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/LoginCamping.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomCamping: selectedCampingData.nom,
          password: password,
        })
      });
      let json = await response.json();
      if (json.status === 'success') {
        navigation.navigate('HomeCamping', {
          idCamping: selectedCamping,
          campingName: selectedCampingData.nom,
          userId,
          userName
        });
      } else {
        Alert.alert("Erreur de connexion", json.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };

  const renderDropdown = () => {
    return (
      <View style={HomeScreenStyle.dropdown}>
        <ScrollView>
          {campings.map((camping, index) => (
            <TouchableOpacity
              key={camping.id}
              style={[HomeScreenStyle.dropdownItem, { backgroundColor: index % 2 === 0 ? '#f9fafb' : '#f0f4f8' }]}
              onPress={() => {
                setSelectedCamping(camping.id);
                setShowDropdown(false);
              }}
            >
              <Text style={HomeScreenStyle.dropdownItemText}>{camping.nom}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
      <View style={HomeScreenStyle.container}>
        <TouchableOpacity style={HomeScreenStyle.profilePicContainer} onPress={handleProfilePicChange}>
          <Image source={userPhoto ? { uri: userPhoto } : require('../ASSET/profil.jpg')} style={HomeScreenStyle.profilePic} />
        </TouchableOpacity>
        <Text style={HomeScreenStyle.userName}>{userName}</Text>
        <View style={HomeScreenStyle.frameContainer}>
          <Text style={HomeScreenStyle.label}>Nom du camping :</Text>
          <TouchableOpacity style={HomeScreenStyle.input} onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={HomeScreenStyle.inputText}>
              {selectedCamping ? campings.find(c => c.id === selectedCamping)?.nom : "Sélectionner un camping"}
            </Text>
          </TouchableOpacity>
          {showDropdown && renderDropdown()}
          <TextInput
            style={HomeScreenStyle.input}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={HomeScreenStyle.button} onPress={handleConnectToCamping}>
            <Text style={HomeScreenStyle.buttonText}>Se connecter au camping</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default HomeScreen;