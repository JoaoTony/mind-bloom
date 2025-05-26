import { Dimensions, StyleSheet } from "react-native";

const { width, height } =  Dimensions.get("screen")

export const modalStyles = StyleSheet.create({
  // //  container: {
  // //   flex: 1,
  // //   backgroundColor: 'grey',
  // // },
  // // contentContainer: {
  // //   flex: 1,
  // //   padding: 36,
  // //   alignItems: 'center',
  // // },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4b4f59',
    marginBottom: 10
  },
  close: {
    position: "absolute",
    zIndex: 20,
    top: 20,
    right: 20
  },
  // modalOverlay: {
  //    backgroundColor: 'blue',
  //   padding: 20,
  //   borderRadius: 12,
  //   // elevation: 5, // sombra para Android
  //   // shadowColor: '#000', // sombra para iOS
  //   // shadowOpacity: 0.3,
  //   // shadowOffset: { width: 0, height: 2 },
  //   // shadowRadius: 4,
  //   position: 'relative',
  //   zIndex: 20,
  //   top: 0,
  //   left: 0,
  //   flex: 1,
  //   width,
  //   height
  // },
  // modalContent: {
  //   position: 'absolute',
  //   zIndex:30
  //   // backgroundColor: 'blue',
  //   // padding: 20,
  //   // borderRadius: 12,
  //   // elevation: 5, // sombra para Android
  //   // shadowColor: '#000', // sombra para iOS
  //   // shadowOpacity: 0.3,
  //   // shadowOffset: { width: 0, height: 2 },
  //   // shadowRadius: 4,
  //   // top: 0,
  //   // left: 0,
  //   // flex: 1,
  //   // width,
  //   // height
  // },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10, // para Android
    shadowColor: '#000', // para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10000,
  },
})
