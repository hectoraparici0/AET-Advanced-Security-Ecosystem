// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { SecurityProvider } from './src/context/SecurityContext';

// Screens
import Dashboard from './src/screens/Dashboard';
import ToolDetails from './src/screens/ToolDetails';
import Alerts from './src/screens/Alerts';
import Settings from './src/screens/Settings';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <SecurityProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
              options={{
                headerStyle: {
                  backgroundColor: '#1e1b4b',
                },
                headerTintColor: '#fff',
                title: 'AET Security'
              }}
            />
            <Stack.Screen 
              name="ToolDetails" 
              component={ToolDetails}
              options={({ route }) => ({ 
                title: route.params?.toolName || 'Detalles',
                headerStyle: {
                  backgroundColor: '#1e1b4b',
                },
                headerTintColor: '#fff',
              })}
            />
            <Stack.Screen 
              name="Alerts" 
              component={Alerts}
              options={{
                headerStyle: {
                  backgroundColor: '#1e1b4b',
                },
                headerTintColor: '#fff',
                title: 'Alertas'
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings}
              options={{
                headerStyle: {
                  backgroundColor: '#1e1b4b',
                },
                headerTintColor: '#fff',
                title: 'Configuración'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SecurityProvider>
    </ThemeProvider>
  );
};

export default App;

// components/SecurityCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SecurityCardProps {
  tool: {
    id: string;
    name: string;
    icon: string;
    status: string;
    metrics: {
      [key: string]: number | string;
    };
  };
}

const SecurityCard = ({ tool }: SecurityCardProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ToolDetails', { toolId: tool.id, toolName: tool.name })}
    >
      <View style={styles.header}>
        <Icon name={tool.icon} size={24} color="#8b5cf6" />
        <Text style={styles.title}>{tool.name}</Text>
      </View>
      <View style={styles.metrics}>
        {Object.entries(tool.metrics).map(([key, value]) => (
          <View key={key} style={styles.metric}>
            <Text style={styles.metricLabel}>{key.replace('_', ' ')}</Text>
            <Text style={styles.metricValue}>{value}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.status, tool.status === 'active' ? styles.active : styles.inactive]}>
        <Text style={styles.statusText}>
          {tool.status === 'active' ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  metrics: {
    marginBottom: 12,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  metricValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  inactive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SecurityCard;
