export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }

      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(field.trim());
      field = '';
      continue;
    }

    if (char === '\n') {
      row.push(field.trim());

      if (row.some((value) => value !== '')) {
        rows.push(row);
      }

      row = [];
      field = '';
      continue;
    }

    if (char === '\r') {
      continue;
    }

    field += char;
  }

  if (field !== '' || row.length > 0) {
    row.push(field.trim());

    if (row.some((value) => value !== '')) {
      rows.push(row);
    }
  }

  if (!rows.length) {
    return [];
  }

  const [headers, ...records] = rows;
  const normalizedHeaders = headers.map((header) => header.trim());

  return records
    .map((record) =>
      normalizedHeaders.reduce((result, header, columnIndex) => {
        result[header] = record[columnIndex] ?? '';
        return result;
      }, {}),
    )
    .filter((record) => Object.values(record).some(Boolean));
}
