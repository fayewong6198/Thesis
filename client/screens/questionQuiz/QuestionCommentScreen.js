import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Button,
  Image,
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
import { IP } from "../../config/config";
import {
  COLOR_PRIMARY,
  COLOR_BLUE_DARK,
  COLOR_SECONDARY,
  COLOR_BLUE,
} from "../../config/color";
import { MaterialIcons } from "@expo/vector-icons";

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
    text: "kkkkzz",
  });

  const { text } = formData;

  const onChange = (name) => (value) => {
    console.log(value.charCodeAt(value.length - 1));
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    if (text.length > 5) createQuestionComments(route.params.id, formData);
    // setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        loadUser();
        setId(route.params.id);
        getQuestionComments(route.params.id);
        setText(route.params.text);
        console.log("ahihihihihih");
      },
      [comments]
    );

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log("comment changed");
    console.log(comments);
  }, [comments]);

  return (
    <View>
      <AlertComponent></AlertComponent>
      <Text> {questionText && questionText} </Text>

      <View style={styles.createCommnentContainer}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: `${IP}:5000/uploads/${user.avatar}?time=${new Date()}`,
            }}
            style={styles.image}
          ></Image>
        </View>
        <View style={{ flex: 5 }}>
          <TextInput
            multiline={true}
            numberOfLines={1}
            value={text}
            onChangeText={(e) => {
              onChange("text")(e);
            }}
            style={styles.createCommentInput}
          ></TextInput>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableHighlight
          style={styles.commentButton}
          onPress={(e) => onSubmit(e)}
        >
          <Text style={styles.textStyle}>Comment</Text>
        </TouchableHighlight>
      </View>

      {comments && comments.length > 0 ? (
        <FlatList
          data={comments}
          extraData={comments}
          renderItem={({ item }) => (
            <View>
              <TouchableHighlight style={styles.item}>
                <View style={styles.commentContainer}>
                  <View style={styles.imageView}>
                    <Image
                      source={{
                        uri: `${IP}:5000/uploads/${
                          item.user.avatar
                        }?time=${new Date()}`,
                      }}
                      style={styles.image}
                    ></Image>
                  </View>
                  <View style={styles.commentInfo}>
                    <View>
                      <Text style={styles.username}>
                        {item.user && item.user.name}
                      </Text>

                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                    <View>
                      <View style={styles.voteButtons}>
                        <View style={styles.voteButton}>
                          <Text
                            style={{ color: COLOR_PRIMARY, paddingRight: 5 }}
                          >
                            0
                          </Text>
                          <MaterialIcons
                            name="thumb-up"
                            size={20}
                            color={COLOR_PRIMARY}
                          />
                        </View>
                        <View style={styles.voteButton}>
                          <MaterialIcons
                            name="thumb-down"
                            size={24}
                            color={COLOR_SECONDARY}
                          />
                          <Text
                            style={{ color: COLOR_SECONDARY, paddingLeft: 5 }}
                          >
                            0
                          </Text>
                        </View>
                      </View>
                      <Button title="delete" color={COLOR_BLUE_DARK}></Button>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>There is no comment yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  createCommnentContainer: {
    marginHorizontal: 5,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  createCommentInput: {
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 10,
  },
  commentButton: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  username: {
    fontWeight: "bold",
    color: COLOR_BLUE_DARK,
  },
  imageView: { flex: 1 },
  commentInfo: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  voteButtons: {
    flexDirection: "row",
  },
  voteButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
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
