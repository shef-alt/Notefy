import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function Notes() {
  const params = useLocalSearchParams();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [icon, setIcon] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://192.168.100.20:3000/notes")
      .then((res) => res.json())
      .then((result) => {
        const found = result.find(
          //@ts-ignore
          (item) => item.id == params.id,
        );
        if (found) {
          setTitle(found.title);
          setNote(found.note);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const addNote = async () => {
    await fetch(`http://192.168.100.20:3000/notes/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        note,
      }),
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Note",
          headerStyle: {
            backgroundColor: "#c3dbcd",
          },
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: 500 }}>{params.subject}</Text>
        <Text style={{ fontSize: 24, fontWeight: 500, color: "gray" }}>
          {params.date}
        </Text>
        <View style={styles.line} />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Title: </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.title}
            placeholder="Add title"
          />
        </View>
        <View style={styles.line} />
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add note"
          multiline
          numberOfLines={100}
        />
        {/* <View style={{ flexDirection: "row"}}>
            <MaterialIcons name="attach-file" size={24} color="black" />
            <TextInput  />
          </View> */}
        <View style={styles.line} />
        <View style={{flexDirection: "row", marginTop: 30, gap: 4 }}>
          <Text
            style={styles.button}
            onPress={() => {
              addNote();
              setIcon(true);
            }}
          >
            Save
          </Text>
          {icon && <AntDesign name="check" size={18} color="#10B981" />}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: "gray",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  },
  line: {
    height: 2,
    margin: 6,
    borderBottomColor: "gray",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 20,
    verticalAlign: "middle",
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
