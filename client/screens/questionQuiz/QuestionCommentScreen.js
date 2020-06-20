import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Button,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import { loadUser } from "../../store/actions/auth";
import {
  getQuestionComments,
  createQuestionComments,
} from "../../store/actions/comment";
import { TextInput } from "react-native-gesture-handler";

const QuestionCommentScreen = ({
  user,
  navigation,
  loadUser,
  route,
  getQuestionComments,
  comments,
  createQuestionComments,
}) => {
  const [id, setId] = useState(null);
  const [questionText, setText] = useState(null);
  const [formData, setFormData] = useState({
    text: "abcxyz",
  });

  const { text } = formData;

  const onChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    console.log("cc");
    createQuestionComments(route.params.id, formData);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        loadUser();
        setId(route.params.id);
        getQuestionComments(route.params.id);
        setText(route.params.text);
      },
      [comments]
    );

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <AlertComponent></AlertComponent>
      <Text> {questionText && questionText} </Text>

      <View style={styles.createCommnentContainer}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={(e) => {
            onChange("comment")(e);
          }}
          style={styles.createCommentInput}
        ></TextInput>
        <Button title="Comment" onPress={(e) => onSubmit(e)}></Button>
      </View>

      {comments && comments.length > 0 ? (
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View>
              <TouchableHighlight style={styles.item}>
                <Text style={styles.text}>{item.text}</Text>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>Ahihi</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  createCommnentContainer: {
    marginHorizontal: 5,
    marginHorizontal: 10,
  },
  createCommentInput: {
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  comments: state.comment.comments,
});

const mapDispatchToProps = {
  loadUser,
  getQuestionComments,
  createQuestionComments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCommentScreen);
