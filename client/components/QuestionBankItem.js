import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const QuestionBankItem = ({ item, navigation }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        console.log("Pressed");
        navigation.push("Prepare", { questionBankId: item._id });
        console.log("Pressed");
      }}
    >
      <View style={styles.item}>
        <Text>Author: {item.user.name}</Text>
        <Text>{item.name}</Text>
        <Text>Number of chapters: {item.chapters && item.chapters.length}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#BEDF87",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBankItem);
