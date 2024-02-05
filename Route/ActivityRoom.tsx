import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { RouteProp, } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

type ActivityRoomProps = {
  route: RouteProp<RootStackParamList, 'ActivityRoom'> & {
    params: {
      userId: number;
      idCamping: string;
    };
  };
};

type Activity = {
  id: string;
  LIB_ACTIVITE: string;
  NOM: string;
  NB_PLACE: number;
  HEURE_DEBUT: string;
  HEURE_FIN: string;
};

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

function ActivityRoom({ route }: ActivityRoomProps) {
  const { idCamping } = route.params;
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}`)
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
    </ImageBackground>
  );
}

export default ActivityRoom;
