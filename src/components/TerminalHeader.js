import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TerminalHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>[ conteo de votos ]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 20, alignItems: 'center' },
  title: { color: '#00FF00', fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold' },
});
