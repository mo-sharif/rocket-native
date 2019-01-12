import Colors from "../../../native-base-theme/variables/commonColor";

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: "white" },
    activeTintColor: "red",
    titleStyle: {
      color: Colors.textColor,
      alignSelf: "center",
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase
    },
    backButtonTintColor: Colors.textColor
  },

  tabProps: {
    activeTintColor: "red",
    showLabel: false,
    swipeEnabled: true,
    key: "tabbar",
    type: "replace"
  },

  icons: {
    style: { height: 30, width: 30 }
  }
};
