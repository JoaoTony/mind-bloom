import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen")

export const homeSearchSyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 14,
    height: 50,
    marginTop: 20
  },
  input: {
    backgroundColor: '#D9D9D9',
    height: 50,
    width: width - 50 - 14 - 16 * 2,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
