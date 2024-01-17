import React from 'react';
import { View, Text } from 'react-native';
import styles from './WeeklyPlanningStyles';
import { PlanningEvent } from './types';

const WeeklyPlanning = ({ planning }: { planning: { [key: string]: PlanningEvent[] } }) => {
    return (
        <View style={styles.table}>
            <View style={styles.row}>
                <Text style={styles.header}>Lundi</Text>
                <Text style={styles.header}>Mardi</Text>
                <Text style={styles.header}>Mercredi</Text>
                <Text style={styles.header}>Jeudi</Text>
                <Text style={styles.header}>Vendredi</Text>
                <Text style={styles.header}>Samedi</Text>
                <Text style={styles.header}>Dimanche</Text>
            </View>

            {/* Ajoutez ici la logique pour afficher les événements dans les colonnes correspondantes */}
            {/* Par exemple, vous pourriez itérer sur chaque jour de la semaine et afficher les événements de ce jour */}
            {/* Ceci est un exemple simple et devra probablement être adapté en fonction de vos données */}
            <View style={styles.row}>
                {Object.keys(planning).map((day: string) => (
                    <View key={day} style={styles.cell}>
                        {planning[day].map((event: PlanningEvent, index: number) => (
                            <Text key={index}>{event.LIB_ACTIVITE}</Text>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default WeeklyPlanning;
