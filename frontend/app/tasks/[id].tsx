import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import axiosInstance from '../../src/utils/axiosConfig';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

interface Task {
  _id: string;
  title: string;
  description: string;
}

export default function TaskListScreen() {
  const { user, logout } = useAuth();
  const router = useRouter(); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get<Task[]>('/tasks');
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
  onPress={() => {
    console.log(`Navigating to /tasks/${item._id}`);
    router.push(`/tasks/${item._id}`);
  }}
>
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text>{item.description}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No tasks added yet.</Text>
      )}

      <Button mode="contained" onPress={()=>router.push('/tasks/add')} style={styles.logoutButton}>
        Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 16,
  },
});
