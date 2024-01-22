import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styles from '../Styles/HomeCampingStyles';
import { PlanningEvent } from './types';
import WeeklyPlanning from './WeeklyPlanning';

type HomeCampingProps = {
  route: RouteProp<RootStackParamList, 'HomeCamping'>; // Utiliser RouteProp avec le type de la route
};

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/fond_vaca_meet.jpg" };
const defaultProfilePic = require('../ASSET/profil.jpg');

function HomeCamping({ route }: HomeCampingProps) {
  const [userPhoto, setUserPhoto] = useState(defaultProfilePic);
  const { planning } = route.params; // Récupérer le planning à partir des paramètres de la route
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [structuredPlanning, setStructuredPlanning] = useState<{ [key: string]: PlanningEvent[] }>({});

  useEffect(() => {
    // Charger les informations de l'utilisateur (logique à implémenter)
  }, []);

  useEffect(() => {
    loadPlanning();
  }, [selectedDate]);

  const getWeekStartAndEnd = (date: Date) => {
    let startDate = new Date(date);
    let endDate = new Date(date);

    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    endDate.setDate(endDate.getDate() - endDate.getDay() + 7);

    return { startDate, endDate };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const loadPlanning = async () => {
    const { startDate, endDate } = getWeekStartAndEnd(selectedDate);
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    try {
      const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadPlanningCamping.php?dateDebut=${startDateStr}&dateFin=${endDateStr}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse: any = await response.json();

      if (jsonResponse.status === 'success') {
        const structuredPlanning = structurePlanningByDay(jsonResponse.data);
        setStructuredPlanning(structuredPlanning); // Mettre à jour l'état structuredPlanning avec les données
      } else {
        console.error("Erreur dans la réponse du serveur: ", jsonResponse.message);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du planning: ", error);
    }
  };

  const structurePlanningByDay = (data: PlanningEvent[]) => {
    const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    let structuredData: { [key: string]: PlanningEvent[] } = {
      Lundi: [], Mardi: [], Mercredi: [], Jeudi: [], Vendredi: [], Samedi: [], Dimanche: []
    };

    data.forEach((item: PlanningEvent) => {
      const dayOfWeek = new Date(item.DATE_HEURE_DEBUT).getDay();
      const dayName = weekDays[(dayOfWeek + 6) % 7]; // Ajustement pour que Dimanche soit 0

      if (dayName in structuredData) {
        structuredData[dayName as keyof typeof structuredData].push(item);
      }
    });

    return structuredData;
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.profilePicContainer}>
          <Image source={userPhoto} style={styles.profilePic} />
        </TouchableOpacity>
        <Text style={styles.text}>Bienvenue dans votre camping!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ViewPlanningCamping', { planning: structuredPlanning })}
        >
          <Text style={styles.buttonText}>Voir planning Camping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voir activité vacancier</Text>
        </TouchableOpacity>
        <View style={styles.dateControls}>
          <DateTimePicker
            style={styles.datePickerStyle}
            value={selectedDate}
            mode="date"
            minimumDate={new Date(2020, 0, 1)}
            maximumDate={new Date(2025, 11, 31)}
            onChange={(event: any, date: any) => date && setSelectedDate(date)}
          />
        </View>
        {structuredPlanning && <WeeklyPlanning planning={structuredPlanning} />}
      </View>
    </ImageBackground>
  );
}

export default HomeCamping;
