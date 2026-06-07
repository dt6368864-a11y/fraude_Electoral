import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { auditE14Records } from '../../../src/utils/e14Auditor';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

describe('Análisis Forense Digital - Auditoría de Formularios E-14', () => {

  test('Debería detectar con éxito las mesas con fraude (Votos > Capacidad de la Mesa)', async () => {
    const { data: e14Records, error } = await supabase
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

    expect(error).toBeNull();
    expect(e14Records).toBeDefined();
    expect(e14Records.length).toBeGreaterThan(0);

    const fraudulentTables = auditE14Records(e14Records);

    console.log(`[TEST FORENSE] Mesas sospechosas identificadas: ${fraudulentTables.length}`);

    expect(fraudulentTables.length).toBeGreaterThanOrEqual(2);

    const mesaTresFraude = fraudulentTables.find(
      f => f.polling_tables.table_number === 3
    );
    expect(mesaTresFraude).toBeDefined();
  });

  test('auditE14Records detecta votos que superan la capacidad', () => {
    const mockData = [
      {
        candidate_a_votes: 200,
        candidate_b_votes: 100,
        blank_votes: 50,
        null_votes: 10,
        polling_tables: { table_number: 3, registered_voters: 350 }
      },
      {
        candidate_a_votes: 100,
        candidate_b_votes: 80,
        blank_votes: 10,
        null_votes: 5,
        polling_tables: { table_number: 1, registered_voters: 300 }
      }
    ];

    const result = auditE14Records(mockData);
    expect(result.length).toBe(1);
    expect(result[0].polling_tables.table_number).toBe(3);
  });
});