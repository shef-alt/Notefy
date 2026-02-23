import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "@/context/context"
import AntDesign from "@expo/vector-icons/AntDesign";

const PlaceholderImage = require("@/assets/images/guest-user.webp");

export default function ChangeProfile() {
  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [icon, setIcon] = useState<boolean>(false);
  const context = useContext(Context);
  const { value, setValue } = context || { value: undefined, setValue: () => {} };

  useEffect(() => {
    fetch("http://192.168.100.20:3000/profile")
      .then((res) => res.json())
      .then((result) => {
        setName(result[0].name);
        setMajor(result[0].major);
      })
      .catch((err) => console.error(err));
  }, []);

  const addProfile = async () => {
    await fetch(`http://192.168.100.20:3000/profile/${1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        major,
      }),
    });
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const image = selectedImage ? selectedImage : PlaceholderImage;

  setValue(image)

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Change Profile",
          headerStyle: {
            backgroundColor: "#c3dbcd",
          },
        }}
      />
      <View style={styles.container}>
        <View style={{alignSelf: "center"}}> 
          <Image source={value} style={styles.image}/>
          <Pressable onPress={pickImageAsync}>
            <Text style={{fontSize: 20, textAlign: "center"}}>Change</Text>
          </Pressable>
        </View>
        <Text style={{ fontWeight: 500 }}>Change Your Name: </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? "#2563EB" : "#D1D5DB" },
          ]}
          onPress={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={name}
          onChangeText={setName}
        />
        <Text style={{ fontWeight: 500 }}>Change Your MAjor: </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused2 ? "#2563EB" : "#D1D5DB" },
          ]}
          onPress={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
          value={major}
          onChangeText={setMajor}
        />
        <View style={{flexDirection: "row", marginTop: 10, gap: 4 }}>
          <Text
            style={styles.button}
            onPress={() => {
              addProfile()
              setIcon(true);
            }}
          >
            Save
          </Text>
          {icon && <AntDesign name="check" size={18} color="#10B981" />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    verticalAlign: "middle",
    padding: 2,
  },
  button: {
    width: 60,
    height: 28,
    gap: 3,
    padding: 2,
    borderRadius: 8,
    backgroundColor: "#22C55E",
    textAlign: "center", 
    color: "white"
  }
});
