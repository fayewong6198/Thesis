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
  TouchableHighlight,
} from "react-native";

import { connect } from "react-redux";
import { updateUser, loadUser } from "../../store/actions/auth";
import * as ImagePicker from "expo-image-picker";
import AlertComponent from "../../components/AlertComponent";
import { IP } from "../../config/config";
import { COLOR_BLUE, COLOR_PRIMARY } from "../../config/color";

const UserInfoScreen = ({ auth, updateUser, loadUser }) => {
  const user = auth.user;
  useEffect(() => {
    loadUser();
    console.log(user);
    return () => {};
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
          <View style={styles.image}>
            <Image
              source={{ uri: image.image.uri }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            ></Image>
          </View>
        ) : (
          <View style={styles.image}>
            <Image
              source={{
                uri: `${IP}:5000/uploads/${user.avatar}?time=${new Date()}`,
              }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            ></Image>
          </View>
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
          <TouchableHighlight
            style={styles.openButton}
            onPress={(e) => {
              onSubmit();
            }}
          >
            <Text style={styles.textStyle}>Apply</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.secondaryButton}
            onPress={() => pickImage()}
          >
            <Text style={styles.textStyle}>Change avatar</Text>
          </TouchableHighlight>
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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    flexDirection: "row",
    justifyContent: "center",
  },
  openButton: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: COLOR_PRIMARY,
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
});

export default connect(mapStateToProps, { updateUser, loadUser })(
  UserInfoScreen
);
