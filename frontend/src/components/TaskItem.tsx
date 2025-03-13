import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip, Paragraph } from 'react-native-paper';
import { formatDistanceToNow } from 'date-fns';
import { taskColors } from '../utils/theme';

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    dueDate?: string | Date;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    createdAt: string | Date;
  };
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress }) => {
  const getDueDate = () => {
    if (!task.dueDate) return null;
    
    const date = new Date(task.dueDate);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const dueDate = getDueDate();
  const backgroundColor = task.completed ? taskColors.completed : '#ffffff';
  const priorityColor = taskColors[task.priority] || taskColors.medium;

  return (
    <Card style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <Card.Content>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        
        {task.description ? (
          <Paragraph numberOfLines={2} style={task.completed ? styles.completedText : undefined}>
            {task.description}
          </Paragraph>
        ) : null}
        
        <Chip 
          style={[styles.chip, { backgroundColor: priorityColor }]} 
          textStyle={{ color: 'white' }}
        >
          {task.priority}
        </Chip>
        
        {dueDate ? (
          <Text style={styles.dueDate}>
            Due {dueDate}
          </Text>
        ) : null}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  completedText: {
    color: '#757575',
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  dueDate: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default TaskItem;