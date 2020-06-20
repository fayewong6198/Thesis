import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  TextInput,
  Keyboard,
  Image,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import { updateUser, loadUser } from "../../store/actions/auth";
import * as ImagePicker from "expo-image-picker";
import AlertComponent from "../../components/AlertComponent";

const UserInfoScreen = ({ auth, updateUser, loadUser }) => {
  const user = auth.user;
  useEffect(() => {
    loadUser();
    console.log(user);
    return () => { };
  }, []);

  const [formData, setFormData] = useState({
    email: (user && user.email) || "",
    name: (user && user.name) || "",
  });

  const [image, setImage] = useState(null);

  const [imageData, setImageData] = useState(null);

  const { email, password, name } = formData;

  const onChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    let avatarData = null;
    if (imageData) {
      console.log("Image Data" + imageData);
      avatarData = new FormData();
      avatarData.append("file", {
        name: "avatar",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? imageData.uri
            : imageData.uri.replace("file://", ""),
      });
    }
    updateUser(formData, avatarData);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ image: result });
      //      const data = await FileSystem.readAsStringAsync(result.uri);
      setImageData(result);
    }
    console.log(result.cancelled);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AlertComponent></AlertComponent>
        {image ? (
          <Image
            source={{ uri: image.image.uri }}
            style={{ width: 200, height: 200 }}
          ></Image>
        ) : (
            <Image
              source={{
                uri: `http://192.168.0.101:5000/uploads/${
                  user.avatar
                  }?time=${new Date()}`,
              }}
              style={{ width: 200, height: 200 }}
            ></Image>
          )}
        <View style={styles.input}>
          <Text keyboardType="email-address">Email:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChangeText={(e) => onChange("email")(e)}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Name:</Text>
          <TextInput
            autoCapitalize="words"
            placeholder="Enter your name"
            value={name}
            name="email"
            onChangeText={(e) => onChange("name")(e)}
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Change Avatar" onPress={() => pickImage()}></Button>
          <Button
            title="Apply"
            onPress={(e) => {
              onSubmit();
            }}
          ></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderBottomWidth: 1,
  },
  container: {
    margin: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default connect(mapStateToProps, { updateUser, loadUser })(
  UserInfoScreen
);
