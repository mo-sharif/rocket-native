import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    showLabel: false,
    swipeEnabled: true,
    activeTintColor: '#333333',
    key: 'tabbar',
    type: 'replace',
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: 'white',
    tabStyle:{borderColor: "#FF0000"}
  },

  icons: {
    style: { color: Colors.brandMedium, height: 30, width: 30 },
  },
  cameraIcon: {
    style: { 
    color: '#d6d7da',
    fontSize: 20,
    padding: 20,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#d6d7da' },
  },
};
