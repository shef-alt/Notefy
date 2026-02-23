import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";

interface Note {
  id: number;
  subject: string;
}

export default function SubjectList() {
  const [subject, setSubject] = useState<string>("");
  const [id, setId] = useState<number>();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [list, setList] = useState<Note[]>([]);

  const getSubject = () => {
    fetch("http://192.168.100.20:3000/subject")
      .then((res) => res.json())
      .then((result) => setList(result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSubject();
  }, []);

  const addSubject = async () => {
    await fetch("http://192.168.100.20:3000/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
      }),
    });
    getSubject();
  };

  const deleteSubject = async () => {
    await fetch(`http://192.168.100.20:3000/subject${id}`, {
      method: "DELETE",
    });
    getSubject();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "List of Subject",
          headerStyle: {
            backgroundColor: "#c3dbcd",
          },
        }}
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Add the subject:{" "}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TextInput
            style={[
              styles.input,
              { borderColor: isFocused ? "#2563EB" : "#9CA3AF" },
            ]}
            onPress={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={subject}
            onChangeText={setSubject}
          />
          <View style={{ borderWidth: 1, borderColor: "#9CA3AF" }}>
            <MaterialIcons
              onPress={() => {
                addSubject();
                setSubject("");
              }}
              name="add"
              size={20}
              color="#4B5563"
            />
          </View>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>List: </Text>
        {list.map((list, index) => (
          <View key={index} style={styles.list}>
            <Text style={{ fontWeight: "bold" }}>{index + 1}. </Text>
            <Text style={{ fontWeight: "bold" }}>{list.subject}</Text>
            <MaterialIcons
              style={{ position: "absolute", right: 0 }}
              onPress={() => {deleteSubject(); setId(list.id);}}
              name="delete-outline"
              size={24}
              color="black"
            />
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    width: 200,
    height: 25,
    borderWidth: 1,
    verticalAlign: "middle",
    padding: 2,
  },
  list: {
    padding: 6,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 4,
  },
});
