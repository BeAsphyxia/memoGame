export const Images = [
    'https://www.carlogos.org/car-logos/honda-logo.png',
    'https://www.carlogos.org/car-logos/subaru-logo.png',
    'https://www.carlogos.org/car-logos/seat-logo.png',
    'https://www.carlogos.org/car-logos/nissan-logo.png',
    'https://www.carlogos.org/car-logos/ferrari-logo.png',
    'https://www.carlogos.org/car-logos/peugeot-logo.png',
    'https://www.carlogos.org/car-logos/citroen-logo.png',
    'https://www.carlogos.org/car-logos/mini-logo.png',
  ].flatMap((image) =>
    [`a|${image}`, `b|${image}`]
  ).sort(() => Math.random() - 0.5);

export default Images;