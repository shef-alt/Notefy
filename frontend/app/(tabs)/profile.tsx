import * as ImagePicker from "expo-image-picker";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useState, useEffect, useContext } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Context } from"@/context/context"

export default function Profile() {
  const [image, setImage] = useState<string | undefined>(
    undefined,
  );
  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const context = useContext(Context);
  const { value } = context || {value: undefined};

  useEffect(() => {
    fetch("http://192.168.100.20:3000/profile")
      .then((res) => res.json())
      .then((result) => {
        setName(result[0].name);
        setMajor(result[0].major);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={value} style={styles.image} />
        <View>
          <Text style={{ fontSize: 25, width: 200 }}>{name}</Text>
          <Text>{major}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Entypo name="add-to-list" size={24} color="black" />
        <Link style={{ fontSize: 20 }} href={{ pathname: "../subjectList" }}>
          List of subjects
        </Link>
      </View>
      <View style={styles.box}>
        <Ionicons name="settings-sharp" size={24} color="black" />
        <Link style={{ fontSize: 20 }} href={{ pathname: "../changeProfile" }}>
          Change Profile
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  box: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  },
});
