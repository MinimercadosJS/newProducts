function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function toKebabCase(input: string): string {
  return input ? input
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Separa palabras cuando hay un cambio de mayúsculas a minúsculas
    .replace(/[\s_]+/g, '-') // Reemplaza espacios y guiones bajos por guiones
    .toLowerCase()
    :
    "none" // Convierte todo a minúsculas
}
function kebabToLowerCase(input: string): string {
  return input.replace(/-/g, ' ').toLowerCase();
}

function verifyTitleCase(input: string): boolean {
  const upper = /^[A-Z0-9ÁÉÍÓÚÑÜ\s]*$/;
  const lower = /^[a-z0-9áéíóúñü\s]*$/;
  return !(upper.test(input) || lower.test(input));

}
function camelCaseToTitleCase(camelCaseString: string) {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatPrice(value: number) {
  const formattedNumber = Number(value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  return formattedNumber;
}
function removeAccents(string: string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function trimObject<T extends Record<string, any>>(obj: T): T {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = trimObject(obj[key]); // Recursively trim nested objects
    }
  }
  return obj;
}

export {
  formatName,
  toKebabCase,
  kebabToLowerCase,
  verifyTitleCase,
  camelCaseToTitleCase,
  formatPrice,
  removeAccents,
  trimObject,
}