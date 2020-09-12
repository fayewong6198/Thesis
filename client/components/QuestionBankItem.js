import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { addCourse, removeCourse } from "../store/actions/auth";
import { loadUser } from "../store/actions/auth";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../config/color";

const QuestionBankItem = ({
  item,
  navigation,
  addCourse,
  user,
  button,
  removeCourse,
  loadUser,
}) => {
  const [toggleCourse, setToggleCourse] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  useEffect(() => {
    console.log(item._id);
    loadUser();
    return () => {};
  }, [toggleCourse]);

  useEffect(() => {
    if (user && user.courses) {
      let courses = [];
      for (let i = 0; i < user.courses.length; i++) {
        console.log(i);
        console.log(user.courses[i]);
        courses.push(user.courses[i].questionBank);
        setUserCourses((c) => [...c, "cc"]);
        console.log(courses);
      }

      console.log("------------------------------------------------");
      setUserCourses(courses);
    }
  }, [user]);

  useEffect(() => {
    console.log(userCourses);
  }, [userCourses]);
  return (
    <TouchableNativeFeedback>
      <View style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text>Author: {item.user.name}</Text>
          <Text>{item.name}</Text>
          <Text>
            Number of chapters: {item.chapters && item.chapters.length}
          </Text>
        </View>
        <View style={styles.buttonFlex}>
          <Button
            title="Start"
            style={styles.button}
            color={COLOR_PRIMARY}
            disabled={userCourses.includes(item._id) ? false : true}
            onPress={() => {
              navigation.push("Options", { questionBankId: item._id });
            }}
          />
          {button === true ? (
            <View style={styles.button}>
              <Button
                title="Add to course"
                style={styles.button}
                color={COLOR_SECONDARY}
                disabled={userCourses.includes(item._id) ? true : false}
                onPress={() => {
                  addCourse(item._id), setToggleCourse(!toggleCourse);
                }}
              />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                title="Remove Course"
                style={styles.button}
                color="#A33838"
                disabled={userCourses.includes(item._id) ? false : true}
                onPress={() => {
                  removeCourse(item._id);
                  setToggleCourse(!toggleCourse);
                }}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  container1: {
    width: "80%",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  buttonFlex: {
    flex: 1,
    height: 100,
    justifyContent: "space-around",
  },
  button: {},
});
export default connect(mapStateToProps, { addCourse, removeCourse, loadUser })(
  QuestionBankItem
);
