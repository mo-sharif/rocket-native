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
    swipeEnabled: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: 'white',
    tabBarStyle: { backgroundColor: 'white' },
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
