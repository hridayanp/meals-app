import camelize from 'camelize';

export const locationRequest = (searchTerm) => {
  return fetch(
    `http://6fb5-2405-201-a806-608b-340e-b27f-cff-9cf5.ngrok.io/meals-to-go-e0c54/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
