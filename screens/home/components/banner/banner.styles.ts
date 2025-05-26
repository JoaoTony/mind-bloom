import { StyleSheet } from "react-native"

export const homeBannerSyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    borderRadius: 10,
    // backgroundColor: '#3b4bc0',
    marginTop: 40,
    position: 'relative',
    overflow: 'hidden'
  },
  text: {
    color: '#fff',
    width: '60%',
    fontSize: 16,
    padding: 12,
    alignSelf: 'center',
    marginLeft: 20
  },
  image: {
    width: '30%',
    height: '120%',
    //marginTop: '10%',
    borderRadius: 10,
    top: -20,
    zIndex: 3,
  }

})
