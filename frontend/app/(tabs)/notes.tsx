import ModalNote from "@/components/ModalNote";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";

interface Note {
  id: number;
  subject: string;
  date: string;
}

export default function Notes() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [noteDate, setNoteDate] = useState<Date>(new Date());
  const [list, setList] = useState<Note[]>([]);
  const [id, setId] = useState<number>(0);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://192.168.100.20:3000/notes");
      const result = await res.json();
      setList(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    await fetch("http://192.168.100.20:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        noteDate: noteDate.toISOString().split("T")[0],
      }),
    });
    fetchNotes();
  };

  const deleteNote = async () => {
    await fetch(`http://192.168.100.20:3000/notes/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  const toggle = () => {
    setDropDown(!dropDown);
  };

  let date = new Intl.DateTimeFormat("id-ID").format(noteDate);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={{ width: 1, height: 650, position: "absolute", right: 0 }}>
        <Pressable style={styles.add} onPress={() => setIsVisible(true)}>
          <Ionicons name="add-outline" size={40} color="black" />
          {/* <Text style={{ fontSize: 20 }}>Add Notes</Text> */}
        </Pressable>
      </View>
      <View>
        {list.map((list, index) => (
          <Link
            key={index}
            href={{
              pathname: "../note",
              params: { subject: list.subject, date: list.date, id: list.id },
            }}
            style={styles.notes}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 500 }}>
                {list.subject}
              </Text>
              {dropDown && id === list.id && (
                <View style={styles.dropDown}>
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color="black"
                  />
                  <Text onPress={deleteNote}>Delete</Text>
                </View>
              )}
              <MaterialCommunityIcons
                onPress={() => {
                  setDropDown(true);
                  setId(list.id);
                  toggle();
                }}
                name="dots-vertical"
                size={24}
                color="black"
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 500, color: "gray" }}>
              {list.date}
            </Text>
          </Link>
        ))}
      </View>
      <ModalNote
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setSubject={setSubject}
        setNoteDate={setNoteDate}
        noteDate={noteDate}
        addNote={addNote}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notes: {
    width: 360,
    height: 100,
    borderRadius: 20,
    alignSelf: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    margin: 10,
    padding: 10,
  },
  add: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  dropDown: {
    width: 80,
    height: 35,
    flexDirection: "row",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    position: "absolute",
    zIndex: 99,
    right: 20,
    top: -8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
