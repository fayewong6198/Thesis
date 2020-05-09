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
      <Text style={styles.text}>{alert.msg}</Text>
    </View>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const styles = StyleSheet.create({
  alertSuccess: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "green",
    color: "white",
  },
  alertFailed: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "red",
    color: "white",
  },
  text: {
    color: "white",
  },
});

export default connect(mapStateToProps, {})(AlertComponent);
