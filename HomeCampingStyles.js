import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 20,
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000', 
    },
    button: {
        backgroundColor: '#6A5ACD', 
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff', 
    },
    dateControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    datePickerStyle: { // Style ajouté pour le sélecteur de date
        width: 200,
        marginTop: 20,
    },
    planningContainer: {
        marginTop: 20,
    },
    eventItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
    },
});
