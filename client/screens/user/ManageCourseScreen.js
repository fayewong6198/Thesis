import React, { useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import { loadUserCourse } from "../../store/actions/auth";
import QuestionBankItem from "../../components/QuestionBankItem";
const ManageCourseScreen = ({ loadUserCourse, courses, navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadUserCourse();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <View>
      <AlertComponent></AlertComponent>
      {courses && courses.length > 0 ? (
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <View style={styles.items}>
              <QuestionBankItem
                item={item}
                navigation={navigation}
                button={false}
              ></QuestionBankItem>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No Courses found</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    courses: state.questionBank.questionBanks,
  };
};

const styles = StyleSheet.create({
  items: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default connect(mapStateToProps, { loadUserCourse })(ManageCourseScreen);
