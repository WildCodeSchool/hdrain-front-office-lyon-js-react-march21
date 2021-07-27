export default function createURL(data) {
  const bytes = new TextEncoder().encode(data);
  const blob = new Blob([bytes], {
    type: 'application/json',
  });
  return URL.createObjectURL(blob);
}
