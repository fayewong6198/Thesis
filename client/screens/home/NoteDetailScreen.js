import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Button,
  Modal,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserNote,
  updateUserNote,
  clearNote,
} from "../../store/actions/note";
import AlertComponent from "../../components/AlertComponent";
import {
  COLOR_BLUE,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_BLUE_DARK,
} from "../../config/color";
import { MaterialIcons } from "@expo/vector-icons";

const NoteDetailScreen = ({
  user,
  route,
  note,
  getUserNote,
  updateUserNote,
  clearNote,
}) => {
  const { key } = route.params;
  const [text, setText] = useState("Text is not available");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getUserNote(key);
    return () => {
      clearNote();
    };
  }, []);

  useEffect(() => {
    if (note != null) setText(note.text);
  }, [note]);

  const onChange = (value) => {
    setText(value);
  };

  const onSubmit = (e) => {
    const body = { text: text };
    updateUserNote(key, body);
  };
  return (
    <View>
      <AlertComponent></AlertComponent>

      <View style={styles.noteInfo}>
        <Text style={styles.keyword}>{key}</Text>
        {/* <Text>cc</Text> */}
        {note && <Text style={styles.note}>{note.text}</Text>}
      </View>

      <View style={styles.mainBtnContainer}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: COLOR_PRIMARY }]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: COLOR_SECONDARY }]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Delete</Text>
        </TouchableHighlight>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <MaterialIcons
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            <Text style={styles.modalText}>{key}</Text>
            {note && (
              <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                value={text}
                onChangeText={(e) => onChange(e)}
              ></TextInput>
            )}

            <TouchableHighlight
              style={[styles.button, { backgroundColor: COLOR_BLUE }]}
              onPress={(e) => {
                onSubmit(e);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Update</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  note: state.note.note,
});

const mapDispatchToProps = {
  getUserNote,
  updateUserNote,
  clearNote,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: COLOR_BLUE,
  },
  textInput: {
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "#eee",
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
  },
  mainBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  noteInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  keyword: {
    fontWeight: "bold",
    fontSize: 30,
    color: COLOR_BLUE,
  },
  note: {
    fontSize: 20,
    color: COLOR_BLUE_DARK,
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailScreen);
