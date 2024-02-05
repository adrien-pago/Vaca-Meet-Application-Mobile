import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/ActivityRoomStyles';

const ActivityRoom = ({ route }) => {
  const { idCamping } = route.params;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`'https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}`)
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.LIB_ACTIVITE} - {item.NOM}</Text>
            <Text>Places: {item.NB_PLACE}</Text>
            <Text>De {item.HEURE_DEBUT} à {item.HEURE_FIN}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ActivityRoom;
