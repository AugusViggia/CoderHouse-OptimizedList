import { StyleSheet, Text, View, FlatList, TextInput, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const initialState = [
  { id: 1, text: "Hacer la cama" },
  { id: 2, text: "Comprar pan" },
  { id: 3, text: "Lavar los platos" },
  { id: 4, text: "Tender la ropa" },
  { id: 5, text: "Estudiar" },
  { id: 6, text: "Entrenar" },
];

function ListItem({ item, list, setList}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const popItem = () => {
    const updatedList = list.filter((listItem) => listItem.id !== item.id);
    setList(updatedList);
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.button}
      >
        <Text style={styles.listItemText}>{item.text}</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Are you sure you want to check this task as completed? It will be
            deleted from the list.
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                popItem();
              }}
            >
              <Text style={styles.modalText}>Yes</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(initialState);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const addItem = () => {
    list.push({
      id: Math.random(),
      text: text,
    });

    setList(list);
    setText("");
  };

  const clearList = () => {
    setList([]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Soy la Lista Optimizada</Text>

        <View style={styles.inputAddContainer}>
          <Text style={styles.buttonText}>Agregar a la Lista</Text>
          
          <View style={styles.inputAdd}>
            <TextInput
              placeholder="Escriba aqui..."
              value={text}
              onChangeText={(value) => setText(value)}
              style={styles.input}
            />

            <Pressable onPress={() => addItem()} style={styles.buttonAdd}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </Pressable>
          </View>

        </View>


        <View style={styles.listContainer}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <ListItem item={item} list={list} setList={setList} style={styles.listItem } />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.addEmpty}>

          <Text style={styles.buttonText}>Limpiar Lista</Text>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.buttonEmpty}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Are you sure you want to delete the entire list?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                clearList();
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Yes</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 16,
  },
  container: {
    maxHeight: 530,
    minWidth: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 5,
  },
  addEmpty: {
    minWidth: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue",
  },
  inputAddContainer: {
    flex: 1,
    flexDirection: "column",
    maxHeight: 65,
    minWidth: 340,
    marginBottom: 10,
    backgroundColor: "orange",
  },
  inputAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 320,
    maxHeight: 70,
    marginTop: 10,
    backgroundColor: "pink",
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginBottom: 8,
  },
  buttonAdd: {
    flexDirection: "row",
  },
  buttonEmpty: {
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  listContainer: {
    width: "100%",
    backgroundColor:'lightgreen'
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  listItemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
