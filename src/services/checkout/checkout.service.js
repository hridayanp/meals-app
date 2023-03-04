import createStripe from 'stripe-client';

const stripe = createStripe(
  'pk_test_51HiayzCtmz6bjcdsGgXeQnGnu0g7AEQ8H8eYxqFNI8jjF1c8yNAOK0t7h8SsqTneyNwwMtk0ygfEuk6PEKZp6rml0076yfK16P'
);

export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
};

export const payRequest = async (token, amount, name) => {
  return fetch(
    `http://d688-2405-201-a806-60bc-b416-5d0f-ebdf-8c4d.ngrok.io/meals-to-go-e0c54/us-central1/pay`,
    {
      body: JSON.stringify({
        token,
        name,
        amount,
      }),
      method: 'POST',
    }
  ).then((res) => {
    console.log('res', res);
    if (res.status > 200) {
      return Promise.reject('something went wrong processing your payment');
    }
    return res.json();
  });
};
