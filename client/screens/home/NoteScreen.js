import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import { loadUser } from "../../store/actions/auth";

const NoteScreen = ({ user, navigation, loadUser }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadUser();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <AlertComponent></AlertComponent>
      <Text> NoteScreen </Text>
      <FlatList
        data={user.notes}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight
              style={styles.item}
              onPress={() =>
                navigation.push("NoteDetail", {
                  key: item.key,
                  text: item.text,
                })
              }
            >
              <Text style={styles.text}>{item.key}</Text>
            </TouchableHighlight>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  loadUser,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#9738e0",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 10,
    color: "white",
    alignContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
