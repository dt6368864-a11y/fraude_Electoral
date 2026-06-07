import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PollingTableCard({ item, auditMode }) {
  const total =
    (item.candidate_a_votes || 0) +
    (item.candidate_b_votes || 0) +
    (item.blank_votes || 0) +
    (item.null_votes || 0);
  const max = item.polling_tables?.registered_voters || 0;
  const isFraud = total > max;

  return (
    <View style={[styles.card, isFraud && auditMode && styles.fraud]}>
      <Text style={styles.text}>Mesa: {item.polling_tables?.table_number}</Text>
      <Text style={styles.text}>Total votos: {total} / {max}</Text>
      {isFraud && auditMode && <Text style={styles.alert}>⚠ INCONSISTENCIA</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderColor: '#00FF00', borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 4 },
  fraud: { borderColor: '#FF0000' },
  text: { color: '#00FF00', fontFamily: 'monospace' },
  alert: { color: '#FF0000', fontFamily: 'monospace', fontWeight: 'bold' },
});
