
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);


  const handleButtonClick = () => {
    if (text.length > 0) {
      // setTodos({ ...todos, items: [...todos.items, text] })
      let newTodo;
      const todo = todos[todos.length - 1];
      if (!todo) {
        newTodo = { id: 1, text, completed: false };
      } else {
        const id = todo.id + 1;
        newTodo = { id, text, completed: false };
      }

      setTodos([...todos, newTodo]);
      setText('')
    } else {
      console.log('add something to text')
    }
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }

  const completeTodo = (id) => {
    const newTodo = todos.map(todo => {
      if (todo.id !== id) {
        return todo
      } else {
        return { ...todo, completed: !todo.completed }
      }
    })
    setTodos(newTodo)
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemTodo}>
      <Text style={[styles.item, item.completed ? styles.lineThrough : null]}>
        {item.text}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => completeTodo(item.id)}>
          <Text style={styles.complete}>&#x2713;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.delete}>&#x2715;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space} />
      <Text style={styles.caption}>Add Todo Items</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatlist}
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //styles here
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    flex: 1
  },
  caption: {
    marginBottom: 15,
    fontSize: 20,
  },
  inputContainer: {
    width: '80%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    flex: 0.8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    flex: 0.2,
    width: '20%',
    backgroundColor: '#1d3a1a',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatlist: {
    height: '60%',
    marginTop: 20,
    flexGrow: 1
  },
  itemTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3D9970',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    marginRight: 20,
    fontSize: 16,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  complete: {
    fontSize: 16,
    marginRight: 5
  },
  delete: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
