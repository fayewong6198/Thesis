import React, { Component } from "react";
import { View, Text, StyleSheet, ColorPropType } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AlertComponent = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <View
      key={alert.id}
      style={
        alert.alertType === "success" ? styles.alertSuccess : styles.alertFailed
      }
    >
      <Text
        style={
          alert.alertType === "success" ? styles.textSuccess : styles.textFailed
        }
      >
        {alert.msg}
      </Text>
    </View>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const styles = StyleSheet.create({
  alertSuccess: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "#d4edda",
    borderStyle: "solid",
    borderColor: "#c3e6cb",
    borderWidth: 1,
    borderRadius: 5,
  },
  alertFailed: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "#f8d7da",
    borderStyle: "solid",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 5,
  },
  textSuccess: {
    color: "#155724",
  },

  textFailed: { color: "#721c24" },
});

export default connect(mapStateToProps, {})(AlertComponent);
