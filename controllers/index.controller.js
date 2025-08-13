// Exporta la función controladora 'index' que responde a la ruta principal
export const index = (req, res) => {
  // Envía una respuesta JSON con un mensaje de saludo
  res.json({ message: 'Hello World' });
};

// Exporta la función controladora 'index2' que responde a la ruta secundaria
export const index2 = (req, res) => {
  // Envía una respuesta JSON con un mensaje de saludo diferente
  res.json({ message: 'Hello World 2' });
};