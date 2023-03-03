import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { cardTokenRequest } from '../../../services/checkout/checkout.service';

//pk_test_51HiayzCtmz6bjcdsGgXeQnGnu0g7AEQ8H8eYxqFNI8jjF1c8yNAOK0t7h8SsqTneyNwwMtk0ygfEuk6PEKZp6rml0076yfK16P

const CreditCardComponent = ({ name = 'Test' }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes('incomplete');

    const card = {
      number: values.number,
      exp_month: values.expiry.split('/')[0],
      exp_year: values.expiry.split('/')[1],
      cvc: values.cvc,
      name: name,
    };

    const info = await cardTokenRequest(card);
    console.log('info', info);
  };
  return (
    <SafeArea>
      <LiteCreditCardInput onChange={onChange} />
    </SafeArea>
  );
};

export default CreditCardComponent;
