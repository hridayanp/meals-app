import camelize from 'camelize';

export const restaurantsRequest = (location) => {
  return fetch(
    `http://d688-2405-201-a806-60bc-b416-5d0f-ebdf-8c4d.ngrok.io/meals-to-go-e0c54/us-central1/placesNearby?location=${location}`
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};
