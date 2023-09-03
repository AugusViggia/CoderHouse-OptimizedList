import { StyleSheet, Text, View, FlatList, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const initialState = [
  { id: 1, text: "Harina" },
  { id: 2, text: "Azucar" },
  { id: 3, text: "Cereales" },
];

function ListItem({item}) {
  return (
    <Text>{item.text}</Text>
  )
};


export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(initialState);
  
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
    <View style={styles.container}>
      <Text>Soy la Lista Optimizada</Text>

      <TextInput
        placeholder="Escriba aqui..."
        value={text}
        onChangeText={(value) => setText(value)}
      />

      <FlatList
        data={list}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* {list.map((item) => (
        <Text key={item.id}>{item.text}</Text>
      ))} */}

      <Pressable onPress={() => addItem()}>
        <Text>Agregar a la Lista</Text>
        <FontAwesomeIcon icon={faCirclePlus} />
      </Pressable>

      <Pressable onPress={() => clearList()}>
        <Text>Limpiar Lista</Text>
        <FontAwesomeIcon icon={faTrashCan} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
