import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a', // Bleu foncé
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
      },
      title1 :{
        fontSize: 15,
        color: 'black', // Bleu foncé
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
      },

    container: {
        flex: 1,
        marginTop: 20,
    },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },

    datePickerText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ffffff', 
        padding: 12,
        backgroundColor: '#6A5ACD', 
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    datesLabel: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 10,
        fontWeight: '500',
        color: '#555',
    },

    activityContainer: {
        marginVertical: 7,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },

    activityText: {
        fontSize: 15,
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10,
        color: 'black', 
        fontWeight: 'bold',
    },

    picker: {
        width: '100%', 
        height: 50,
        marginVertical: 10, 
    },

    label: {
        fontSize: 16,
        marginVertical: 10,
        color: '#333',
        fontWeight: 'bold',
    },

    button: {
        padding: 12,
        backgroundColor: '#6A5ACD', 
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    buttonText: {
        color: '#ffffff', 
        textAlign: 'center',
        fontSize: 18,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },

    input: {
        height: 50,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#007bff', 
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f8f9fa', 
        width: '100%', 
    },

    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    upvoteIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 10, 
    },

    upvoteIconActive: {
        tintColor: 'blue', // Changez la couleur de l'icône lorsque l'utilisateur a déjà cliqué dessus
    },

    upvoteCount: {
        marginLeft: 5,
        color: 'black',
    },

    upvoteCountActive: {
        color: 'blue', // Changez la couleur du compteur lorsque l'utilisateur a déjà cliqué dessus
    },

    hidden: {
        display: 'none', // Cache le texte
    },
});

export default styles;
