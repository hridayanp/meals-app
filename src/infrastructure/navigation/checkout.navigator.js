import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const CheckoutStack = createStackNavigator();

import { CheckoutErrorScreen } from '../../features/checkout/screen/checkout-error.screen';
import { CheckoutSuccessScreen } from '../../features/checkout/screen/checkout-success.screen';
import { CheckoutScreen } from '../../features/checkout/screen/checkout.screen';

export const CheckoutNavigator = () => (
  <CheckoutStack.Navigator headerMode="none">
    <CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
    <CheckoutStack.Screen
      name="CheckoutSuccess"
      component={CheckoutSuccessScreen}
    />
    <CheckoutStack.Screen
      name="CheckoutError"
      component={CheckoutErrorScreen}
    />
  </CheckoutStack.Navigator>
);
