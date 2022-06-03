import {StatusBar} from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ListRenderItem,
    TouchableWithoutFeedback
} from 'react-native';
import {useState} from "react";
import {MemoBellSVG} from "./src/svg/Bell";
import Swipeable from "react-native-gesture-handler/Swipeable";
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler'


type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export default function App() {

    const [valueInput, setValueInput] = useState<string>('')

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'React', isDone: true},
            {id: 3, title: 'ToolKit', isDone: false}
        ],
    )

    const render: ListRenderItem<TaskType> = ({item}) => {
        return (
            <GestureHandlerRootView>
                <Swipeable renderLeftActions={left} renderRightActions={right} onSwipeableWillClose={() => removeTask(item.id)}>
                    <TouchableWithoutFeedback onLongPress={() => changeStatus(item.id)}>
                        <View
                            style={[styles.itemList, {backgroundColor: item.isDone ? 'rgba(70,137,70,0.97)' : 'rgba(206,165,165,0.97)'}]}>
                            <MemoBellSVG/>
                            <Text style={styles.title}>
                                {item.title}
                            </Text>
                            <TouchableOpacity
                                onLongPress={() => removeTask(item.id)}
                                delayLongPress={1000}
                            >
                                <Text>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </Swipeable>
            </GestureHandlerRootView>
        )
    }

    const addTask = () => {
        const newTask: TaskType = {
            id: tasks.length + 10,
            title: valueInput ? valueInput : 'N/A',
            isDone: false
        }
        setTasks([newTask, ...tasks])
        setValueInput('')
    }
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeStatus = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: !t.isDone} : t))
    }

    const left = () => {
        return <View>
            <Text>LEFT</Text>
        </View>
    }
    const right = () => {
        return <View>
            <Text>RIGHT</Text>
        </View>
    }

    return (

        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TextInput style={styles.input} value={valueInput}
                           onChangeText={setValueInput}/>

                <TouchableOpacity style={styles.add} onPress={addTask}>
                    <Text style={styles.title}>Add task</Text>
                </TouchableOpacity>

            </View>

            <FlatList data={tasks} renderItem={render}
                      keyExtractor={(item) => item.id + ''}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginTop: 40,
        flex: 1,
        backgroundColor: 'rgba(108,173,163,0.82)',
        paddingHorizontal: 20,
    },
    input: {
        width: 200,
        height: 36,
        backgroundColor: '#fff',
        marginRight: 15,
    },
    itemList: {
        height: 50,
        marginVertical: 5,
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
        flexDirection: "row",

    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        color: 'white',
    },
    add: {
        justifyContent: "center",

    }
});
