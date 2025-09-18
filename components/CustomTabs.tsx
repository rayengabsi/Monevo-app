import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { JSX } from "react";


export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabbarIcon: Record<string, (focused: boolean) => JSX.Element> = {
    Home: (focused) => (
      <Icons.House
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    Statistics: (focused) => (
      <Icons.ChartBar
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    Wallet: (focused) => (
      <Icons.Wallet
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    Profile: (focused) => (
      <Icons.User
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcon[route.name] && tabbarIcon[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(55),
    backgroundColor: colors.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.neutral600,
    borderTopWidth: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
