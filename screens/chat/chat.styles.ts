import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen")

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    height: 100,
    paddingTop: 50,
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    maxWidth: '80%',
    color: '#4b4f59',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#3b4bc0"
  },
  chat: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  footer: {
    backgroundColor: '#fff',
    shadowColor: '#00000030',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    paddingHorizontal: 20,

    // Android shadow
    elevation: 5,
    paddingBottom: 50,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b4bc040',
    padding: 3,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 13,
    alignItems: 'center',
    color: '#4b4f59',
  },
  buttonSend: {
    backgroundColor: '#3b4bc0',
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },

    listContainer: {
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  messageLeft: {
    justifyContent: 'flex-start',
  },
  messageRight: {
    justifyContent: 'flex-end',
  },
  messageCard: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
  },
  ownCard: {
    backgroundColor: '#3b4bc0',
    alignSelf: 'flex-end',
  },
  otherCard: {
    backgroundColor: '#3b4bc040',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff'
  },
   leftMessageText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#4b4f59'
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  dateHeaderContainer: {
  alignItems: 'center',
  marginVertical: 10,
},
dateHeaderText: {
  backgroundColor: '#ddd',
  color: '#444',
  fontSize: 13,
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
},

})
