import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen")

export const childrenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4b4f59',
    marginBottom: 10
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#D9D9D9'
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  button: {
    height: 50,
    borderRadius: 8,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#144467"
  },
  label: {
    color: "#4b4f59",
    fontSize: 14,
    marginBottom: 6
  }
})
