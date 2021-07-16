export default function createURL(data) {
  const str = JSON.stringify(data);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: 'application/json;charset=utf-8',
  });
  return URL.createObjectURL(blob);
}
