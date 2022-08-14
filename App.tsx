import {StatusBar} from 'expo-status-bar';
import {
    Alert,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useState} from "react";
import MemoBellSvg from "./src/svg/Bell";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import 'react-native-gesture-handler';


type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
e
export default function App() {
    const [valueInput, setValueInput] = useState<string>('')

    const [tasks, setTasks] = useState<TaskType[]>([
        {
            id: 1,
            title: "HTML",
            isDone: true
        },
        {
            id: 2,
            title: "React",
            isDone: true
        }, {
            id: 3,
            title: "React-native",
            isDone: true
        }
    ])
    const Left = () => {
        return <View>
            <Text>LEFT</Text>
        </View>
    }
    const Right = () => {
        return <View>
            <Text>RIGHT</Text>
        </View>
    }
    const render: ListRenderItem<TaskType> = ({item}) => {
        return <GestureHandlerRootView>
            <Swipeable renderLeftActions={Left}
                       onSwipeableLeftWillOpen={()=>remove(item.id)}
                       renderRightActions={Right}>
                <TouchableWithoutFeedback onLongPress={() => {
                    changeStatus(item.id)
                }}>
                    <View style={[styles.itemList, {
                        backgroundColor: item.isDone ? '#ffde94' : '#ff5959',
                    }]} onLayout={()=> { }}>
                        <MemoBellSvg color={"#fff"}/>
                        <Text style={styles.title}>{item.title}</Text>

                        <TouchableOpacity
                            onPress={() => {
                                remove(item.id)
                            }}>
                            <Text>del</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        </GestureHandlerRootView>

    }
    const addTask = () => {
        const newTask: TaskType = {
            id: tasks.length + 1,
            title: valueInput ? valueInput : "N/A",
            isDone: false,
        }
        setTasks([newTask, ...tasks])
        setValueInput('')
    }
    const changeStatus = (id: number,) => {
        setTasks(tasks.map((el) => el.id === id ? ({...el, isDone: !el.isDone}) : el))
    }

    const remove = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", marginBottom: 5}}>
                <TextInput
                    style={styles.input}
                    value={valueInput}
                    onChangeText={setValueInput}/>
                <TouchableOpacity style={styles.add}
                                  onPress={addTask}
                                  onLongPress={() => {
                                  }}>
                    <Text style={styles.title}>Add task</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={tasks}
                      renderItem={render}
                      keyExtractor={item => item.id + ''}
                      showsVerticalScrollIndicator={false}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1,
        marginTop: 50,
        backgroundColor: '#deb5b5',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 36,
        backgroundColor: "#fff",
        marginRight: 15,
        borderRadius: 8,
    },
    itemList: {
        marginVertical: 5,
        backgroundColor: "#f37979",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30,
        flexDirection: "row",
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        lineHeight: 19,
    },
    add: {
        justifyContent: "center"
    }

});
