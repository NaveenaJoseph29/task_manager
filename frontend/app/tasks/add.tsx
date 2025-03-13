import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Surface, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { useTasks } from '../../src/context/TaskContext';
import { globalStyles } from '../../src/utils/styles';
import { PRIORITIES } from '../../src/utils/constants';
import { taskColors } from '../../src/utils/theme';

export default function AddTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTask = async () => {
    if (!title) {
      setError('Task title is required');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const newTask = await addTask({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
      });
      console.log('Task Added:', newTask); 
      router.push(`/tasks/${newTask._id}`); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Add New Task</Text>
        
        {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
        
        <TextInput
          label="Task Title"
          value={title}
          onChangeText={setTitle}
          style={globalStyles.input}
          placeholder="What needs to be done?"
        />
        
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={globalStyles.input}
          multiline
          numberOfLines={4}
          placeholder="Add details about this task"
        />
        
        <TextInput
          label="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
          style={globalStyles.input}
          placeholder="e.g., 2025-03-15"
        />
        
        <Text style={styles.label}>Priority</Text>
        <View style={styles.chipContainer}>
          <Chip
            selected={priority === PRIORITIES.LOW}
            onPress={() => setPriority(PRIORITIES.LOW)}
            style={[styles.chip, { backgroundColor: priority === PRIORITIES.LOW ? taskColors.low : undefined }]}
            textStyle={{ color: priority === PRIORITIES.LOW ? 'white' : undefined }}
          >
            Low
          </Chip>
          <Chip
            selected={priority === PRIORITIES.MEDIUM}
            onPress={() => setPriority(PRIORITIES.MEDIUM)}
            style={[styles.chip, { backgroundColor: priority === PRIORITIES.MEDIUM ? taskColors.medium : undefined }]}
            textStyle={{ color: priority === PRIORITIES.MEDIUM ? 'white' : undefined }}
          >
            Medium
          </Chip>
          <Chip
            selected={priority === PRIORITIES.HIGH}
            onPress={() => setPriority(PRIORITIES.HIGH)}
            style={[styles.chip, { backgroundColor: priority === PRIORITIES.HIGH ? taskColors.high : undefined }]}
            textStyle={{ color: priority === PRIORITIES.HIGH ? 'white' : undefined }}
          >
            High
          </Chip>
        </View>
        
        <Button
          mode="contained"
          onPress={handleAddTask}
          loading={loading}
          disabled={loading}
          style={globalStyles.button}
        >
          Add Task
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={globalStyles.button}
        >
          Cancel
        </Button>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  surface: {
    padding: 24,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});