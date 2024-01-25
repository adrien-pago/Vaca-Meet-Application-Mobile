import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; 
import styles from '../Styles/ViewPlanningCampingStyles';
import { PlanningEvent } from './types';

type ViewPlanningCampingProps = {
    route: RouteProp<RootStackParamList, 'ViewPlanningCamping'>;
};


function ViewPlanningCamping({ route }: ViewPlanningCampingProps) {
    const { planning } = route.params;


    if (!planning) {
        return <Text>Aucun planning disponible.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Planning de Camping</Text>
            {Object.keys(planning).map((day) => (
                <View key={day} style={styles.dayContainer}>
                    <Text style={styles.dayTitle}>{day}</Text>
                    {planning[day].map((event: PlanningEvent, index: number) => (
                        <View key={index} style={styles.eventContainer}>
                            <Text style={styles.eventText}>{event.LIB_ACTIVITE}</Text>
                            {/* Autres détails de l'événement */}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

export default ViewPlanningCamping;
