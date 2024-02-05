import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

type ActivityEvent = {
  LIB_ACTIVITE: string;
  NOM: string;
  NB_PLACE: number;
  HEURE_DEBUT: string;
  HEURE_FIN: string;
};

type ActivityData = ActivityEvent[];

type ActivityRoomProps = {
  route: RouteProp<RootStackParamList, 'ActivityRoom'> & {
    params: {
      idCamping: number;
    };
  };
};

function ActivityRoom({ route }: ActivityRoomProps) {
  const { idCamping } = route.params;
  const [activities, setActivities] = useState<ActivityData>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadActivities(selectedDate);
  }, [selectedDate]);

  const loadActivities = async (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    console.log(dateStr)

    try {
      const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}&date=${dateStr}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'success') {
        setActivities(data.data);
      } else {
        console.error("Erreur dans la réponse du serveur: ", data.message);
        setActivities([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des activités: ", error);
      setActivities([]);
    }
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Réinitialiser l'heure, minute, et seconde à zéro
      selectedDate.setHours(0, 0, 0, 0);
      
      setSelectedDate(selectedDate);
      setShowDatePicker(false);
    }
  };
  

  return (
    <ImageBackground source={{ uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" }} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>Choisir un jour</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.header}>Activités proposé par les vacanciers</Text>
        <Text style={styles.datesLabel}>
          {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </Text>

        {activities.map((activity, index) => (
          <View key={index} style={styles.activityContainer}>
            <Text style={styles.activityText}>
              {activity.LIB_ACTIVITE} - {activity.NOM} (Places: {activity.NB_PLACE}){"\n"}
              De {activity.HEURE_DEBUT} à {activity.HEURE_FIN}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

export default ActivityRoom;
