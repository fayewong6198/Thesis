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
      <Text> NoteDetailScreen</Text>
      <Text>{key}</Text>
      {/* <Text>cc</Text> */}
      {note && <Text>{note.text}</Text>}
      <Button
        style={styles.button}
        title="edit"
        onPress={() => {
          setModalVisible(true);
        }}
      ></Button>

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

            <Button
              onPress={(e) => {
                onSubmit(e);
                setModalVisible(!modalVisible);
              }}
              title="Update"
            ></Button>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
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
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
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
  },
  textInput: {
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailScreen);
