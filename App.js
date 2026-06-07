import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { supabase } from './src/config/supabaseClient';
import TerminalHeader from './src/components/TerminalHeader';
import PollingTableCard from './src/components/PollingTableCard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [auditMode, setAuditMode] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: e14Data, error } = await supabase
        .from('e14_forms')
        .select(`
          candidate_a_votes,
          candidate_b_votes,
          blank_votes,
          null_votes,
          polling_tables (
            table_number,
            registered_voters
          )
        `);
      if (error) throw error;
      setData(e14Data || []);
    } catch (error) {
      console.error("Error cargando datos de API: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TerminalHeader />
      {loading ? (
        <ActivityIndicator size="large" color="#00FF00" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PollingTableCard item={item} auditMode={auditMode} />}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity style={styles.panicButton} onPress={() => setAuditMode(true)}>
        <Text style={styles.panicButtonText}>[ RUN FORENSIC AUDIT ]</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingHorizontal: 15 },
  listContainer: { paddingBottom: 20 },
  panicButton: {
    backgroundColor: '#000000', borderWidth: 2, borderColor: '#00FF00',
    paddingVertical: 15, alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, borderRadius: 4,
  },
  panicButtonText: { color: '#00FF00', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' },
});