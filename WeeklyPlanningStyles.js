import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    table: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    header: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F0F0F0',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        color: '#333',
    },
    // ... Ajoutez d'autres styles si nécessaire ...
});
