import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";

const NoteScreen = () => {
  return (
    <View>
      <AlertComponent></AlertComponent>
      <Text> NoteScreen </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
