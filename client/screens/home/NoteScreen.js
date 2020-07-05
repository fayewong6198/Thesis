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
import { COLOR_BLUE } from "../../config/color";

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

      <FlatList
        data={user.notes}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                navigation.push("NoteDetail", {
                  key: item.key,
                  text: item.text,
                })
              }
            >
              <Text style={styles.textStyle}>{item.key}</Text>
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
  button: {
    margin: 5,
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
