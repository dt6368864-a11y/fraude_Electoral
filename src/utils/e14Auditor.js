/**
 * Analiza los registros electorales y retorna las mesas con inconsistencias de votos.
 * @param {Array} e14Records - Listado de formularios E-14 combinados con su mesa.
 * @returns {Array} Listado de mesas fraudulentas detectadas.
 */
export const auditE14Records = (e14Records) => {
  if (!e14Records || !Array.isArray(e14Records)) return [];

  return e14Records.filter(record => {
    const totalVotes =
      (record.candidate_a_votes || 0) +
      (record.candidate_b_votes || 0) +
      (record.blank_votes || 0) +
      (record.null_votes || 0);

    const maxCapacity = record.polling_tables?.registered_voters || 0;

    return totalVotes > maxCapacity;
  });
};
