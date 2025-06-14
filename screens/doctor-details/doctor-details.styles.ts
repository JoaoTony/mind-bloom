import { StyleSheet, Dimensions } from "react-native"

const { height } = Dimensions.get("screen")

export const doctorDetailsSyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e2e7f3',
    justifyContent: 'flex-end'
  },
  header: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    padding: 16,
    position: 'fixed',
    zIndex: 3,
  },
  content: {
    width: '100%',
    // height: height * 0.4,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.6 - 100,
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain'
  },
  name: {
    fontSize: 24,
    fontWeight: 900,
    color: '#2E4A66',
    marginBottom: 8
  },
  occupation: {
    fontSize: 16,
    color: '#6d6f74',
    marginBottom: 6
  },
  tabSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#6d6f7420',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#6d6f74',
  },
  social: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
    marginBottom: 40,
    //height:
  },
   button: {
    height: 50,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b4bc0',
    marginTop: 20
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#fff"
  },
  sendMessage: {
    fontSize: 14,
    fontWeight: 800,
    color: "#3b4bc0"
  }
})
