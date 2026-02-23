import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import ExpoLogo from "@/components/ExpoLogo";

import Ionicons from "@expo/vector-icons/Ionicons";

interface Subject {
  subject: string;
}

interface Note {
  subject: string;
}

export default function Index() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("http://192.168.100.20:3000/subject")
      .then((res) => res.json())
      .then((result) => setSubjects(result))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://192.168.100.20:3000/notes")
      .then((res) => res.json())
      .then((result) => setNotes(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Notefy!</Text>
        <ExpoLogo />
      </View>
      <Text style={styles.description}>
        This is an app where you can Lorem ipsum dolor sit amet consectetur
        adipisicing elit. In voluptas neque recusandae{" "}
      </Text>
      <View style={styles.listContainer}>
        <View style={{ width: 130 }}>
          <Text style={styles.list}>• My Course List</Text>
          {subjects.map((subject, index) => (
            <Text key={index} style={{ marginTop: 6, fontWeight: 500 }}>
              {index + 1} .{subject.subject}
            </Text>
          ))}
        </View>
        <View style={{ width: 130 }}>
          <Text style={styles.list}>• My Notes List</Text>
          {notes.map((note, index) => (
            <Text key={index} style={{ marginTop: 6, fontWeight: 500 }}>
              {index + 1} .{note.subject}
            </Text>
          ))}
        </View>
      </View>
      <View style={{ height: 70 }}>
        <Text style={styles.description2}>
          This App is Created Using Expo and React-Native.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 5 }}>
          <Ionicons name="logo-instagram" size={24} color="black" />
          <Link
            href={"https://www.instagram.com/fawwazsalishefan/"}
            style={{ fontSize: 14, textDecorationLine: "underline" }}
          >
            @fawwazsalishefan
          </Link>
        </View>
        <Text style={{ fontSize: 12 }}>&copy; 2026 Notefy</Text>
        <Text style={{ fontSize: 12 }}>Built with React Native and Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  titleContainer: {
    padding: 20,
    flexDirection: "row",
    boxShadow: "0 4px 80px 0 rgba(0, 100, 0, 0.2)",
    marginBottom: 20,
  },
  title: {
    width: 280,
    fontSize: 45,
    color: "green",
    textDecorationLine: "underline",
  },
  description: {
    width: "100%",
    fontSize: 15,
    color: "#5F6F67",
    marginBottom: 6,
    padding: 20,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#E5E7EB",
    paddingVertical: 15,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderTopWidth: 1,
    borderColor: "#DCDFE4",
  },
  list: {
    color: "green",
    padding: 4,
    borderBottomWidth: 1,
    borderColor: "gray",
    fontWeight: 500,
  },
  description2: {
    width: 300,
    padding: 15,
    fontSize: 14,
    color: "#5F6F67",
    textAlign: "center",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  footer: {
    height: 90,
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderTopWidth: 1,
    borderColor: "#94A3B8",
    alignItems: "center",
  },
});
