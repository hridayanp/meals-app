import createStripe from 'stripe-client';

const stripe = createStripe(
  'pk_test_51HiayzCtmz6bjcdsGgXeQnGnu0g7AEQ8H8eYxqFNI8jjF1c8yNAOK0t7h8SsqTneyNwwMtk0ygfEuk6PEKZp6rml0076yfK16P'
);

export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
};
