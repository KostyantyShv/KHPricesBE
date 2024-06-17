// price 92 from 49,90 to 53.49
//price 95 from 50,90 to 59,99
//price 95 premium from 55,90 to 61,99
//price Diesel from 50,90	to 55,99
//price gasPropan from 24,99 to 27,99

let stationPrices = [];

function getRandomPrice(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

for (let i = 1; i < 143; i++) {
  const Price92 = getRandomPrice(49.9, 53.49);
  const Price95 = getRandomPrice(50.9, 59.99);
  const Price95Premium = getRandomPrice(55.9, 61.99);
  const priceDiesel = getRandomPrice(50.9, 55.99);
  const priceGasPropan = getRandomPrice(24.99, 27.99);

  const fueltypes = [
    { id: 1, type: '92', price: Price92 },
    { id: 2, type: '95', price: Price95 },
    { id: 3, type: '95-premium', price: Price95Premium },
    { id: 4, type: '98', price: Price95Premium },
    { id: 5, type: 'diesel', price: priceDiesel },
    { id: 6, type: 'Gas Propan', price: priceGasPropan },
  ];

  const randomNumberOfTypesFuel = Math.floor(Math.random() * 6) + 1;
  let uniqueFuelTypes = new Set();

  while (uniqueFuelTypes.size < randomNumberOfTypesFuel) {
    const randomFuelType = Math.floor(Math.random() * 6) + 1;
    uniqueFuelTypes.add(randomFuelType);
  }

  uniqueFuelTypes.forEach((fuelTypeId) => {
    const { price } = fueltypes.find((f) => f.id === fuelTypeId);
    stationPrices.push({
      stationId: i,
      fuelTypeId: fuelTypeId,
      price: price,
    });
  });
}

console.log(JSON.stringify(stationPrices, null));
