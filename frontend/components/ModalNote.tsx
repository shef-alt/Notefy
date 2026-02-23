import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Note {
  subject: string;
}
type Props = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setNoteDate: React.Dispatch<React.SetStateAction<Date>>;
  noteDate: Date;
  addNote: () => void;
};
export default function ModalNote({
  isVisible,
  setIsVisible,
  setSubject,
  setNoteDate,
  noteDate,
  addNote,
}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [list, setList] = useState<Note[]>([]);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("java");

  //@ts-ignore
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || noteDate;
    setShowDate(Platform.OS === "android");
    setNoteDate(currentDate);
    setShowDate(false);
  };

  useEffect(() => {
    fetch("http://192.168.100.20:3000/subject")
      .then((res) => res.json())
      .then((result) => setList(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={isVisible}
      backdropColor={"#9a9999" + 50}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add Notes</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.modalText}>Subject: </Text>
            {/* Input Subject */}
            <TextInput
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={setSubject}
              style={[
                styles.modalInput,
                { borderColor: isFocused ? "#2563EB" : "#D1D5DB" },
              ]}
              placeholder={""}
            ></TextInput>
              <Picker
              style={{height: 51, width: 200, marginLeft: -200, marginBottom: 4}}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue)
                setSubject(itemValue)
              }}
            >
              {list.map((note, index) => (
                <Picker.Item
                  key={index}
                  label={note.subject}
                  value={note.subject}
                />
              ))}
            </Picker>
          </View>
          {/* Input Date */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Text style={styles.modalText}>Date: </Text>
            <Text
              style={[
                styles.modalInput,
                { borderColor: isFocused2 ? "#2563EB" : "#D1D5DB" },
              ]}
              onPress={() => setShowDate(true)}
              onPressIn={() => setIsFocused2(true)}
              onPressOut={() => setIsFocused2(false)}
            >
              {noteDate.toISOString().split('T')[0]}
            </Text>
          </View>
          {/* Buttons */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {/* Cancel Button */}
            <Pressable
              style={[styles.modalButton, { backgroundColor: "#EF4444" }]}
              onPress={() => setIsVisible(false)}
            >
              <MaterialIcons name="delete" size={20} color="white" />
              <Text style={[styles.modalText, { color: "white" }]}>Cancel</Text>
            </Pressable>
            {/* Add Button */}
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setIsVisible(false);
                setNoteDate(noteDate);
                addNote();
              }}
            >
              <MaterialIcons name="add" size={20} color="white" />
              <Text style={[styles.modalText, { color: "white" }]}>Add</Text>
            </Pressable>
          </View>
        </View>
        {/* Showing Date */}
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={noteDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: 300,
    height: 250,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    gap: 18,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalButton: {
    width: 100,
    height: 40,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
  },
  modalText: {
    fontWeight: "600",
  },
  modalInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    verticalAlign: "middle",
    padding: 2,
  },
  modalPicker: {
    width: 200,
    height: 50,
    verticalAlign: "middle",
    borderWidth: 1,
    borderColor: "black",
    padding: 0,
  },
});
