import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

function ButtonLook({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
      onPress={onPress}
    >
      <Text style={[styles.BtnText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosBtn: {
    backgroundColor: "#3fc1c9",
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBtn: {
    backgroundColor: "#3fc1c9",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  BtnText: {
    color: "#f5f5f5",
    fontSize: 22,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
  },
});

export default ButtonLook;
