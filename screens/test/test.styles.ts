import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen")

export const testStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: '#4b4f59',
    marginBottom: 10
  },
  newTestContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e2e7f3',
    // justifyContent: 'flex-end'
  },
  newTextHeader: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
  },
  content: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    // height: height * 0.4,
    backgroundColor: '#fff',
    paddingTop: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    minHeight: 300
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
    maxWidth: '70%',
  },
  newTestSection: {
    width: '100%',
    paddingHorizontal: 16
  },
  sectionTitle: {
    color: "#144467",
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 8
  },
  sectionText: {
    color: "#6d6f74",
    fontSize: 14,
    fontWeight: 900,
    marginBottom: 8
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
    color: '#6d6f7480',
  },
  social: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
    marginBottom: 40
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 30
  },
  butttonNext: {
    backgroundColor: '#2E4A66',
    padding: 12,
    borderRadius: 8
  },
  butttonNextText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 700,
    paddingHorizontal: 12
  },
  butttonPrev: {
    backgroundColor: '#ffffff00',
    padding: 12,
    borderRadius: 8
  },
  noButton: {
    backgroundColor: '#D9D9D9',
    padding: 12,
    borderRadius: 8
  },
  noButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 700,
    paddingHorizontal: 12
  },
  buttonPrevText: {
    fontSize: 16,
    color: '#2E4A66',
    fontWeight: 700
  },
  quation: {
    fontSize: 26,
    color: "#4b4f59",
    fontWeight: 500,
    textAlign: 'center',
    maxWidth: '70%'
  },
  illustration: {
    height:  width * 0.6,
    maxWidth: width * 0.6,
    alignSelf: 'center',
    marginVertical: 20
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
})
