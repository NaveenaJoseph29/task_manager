import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import { Menu } from "react-native-paper";
import * as IconSets from "@expo/vector-icons";
import axiosInstance from "../../src/utils/axiosConfig";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const App = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setRefreshing(true);
      const response = await axiosInstance.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const openTaskModal = (task: Task | null = null) => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDesc(task.description);
      setEditingTask(task);
    } else {
      setTaskTitle("");
      setTaskDesc("");
      setEditingTask(null);
    }
    setModalVisible(true);
  };

  const saveTask = async () => {
    try {
      if (editingTask) {
        await axiosInstance.put(`/tasks/${editingTask._id}`, {
          title: taskTitle,
          description: taskDesc,
        });
      } else {
        await axiosInstance.post("/tasks", {
          title: taskTitle,
          description: taskDesc,
        });
      }
      fetchTasks();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout(router);
      console.log("Logout successful, navigating to login...");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const confirmDelete = () => {
        Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                await axiosInstance.delete(`/tasks/${taskId}`);
                fetchTasks();
              } catch (error) {
                console.error("Error deleting task:", error);
              }
            },
          },
        ]);
      };
      confirmDelete();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.menuBar}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={styles.menuIcon}
              >
                <IconSets.Feather name="more-vertical" size={24} color="white" />
              </TouchableOpacity>
            }
            anchorPosition="bottom"
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                openTaskModal();
              }}
              title="Add Task"
              leadingIcon={() => <IconSets.Feather name="plus-circle" size={20} />}
            />
            <Menu.Item
              onPress={handleLogout}
              title="Logout"
              leadingIcon={() => <IconSets.Feather name="log-out" size={20} />}
            />
          </Menu>
        </View>

        <View style={{ marginTop: "5%", marginLeft: "3%", marginRight: "3%" }}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => openTaskModal(item)}
                  >
                    <IconSets.Feather name="edit" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTask(item._id)}
                  >
                    <IconSets.Feather name="trash-2" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />
            }
          />
        </View>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingTask ? "Edit Task" : "Add Task"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Task Description"
                value={taskDesc}
                onChangeText={setTaskDesc}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  menuIcon: {
    padding: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,1)",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "lightgray",
  },
  actionButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default App;
