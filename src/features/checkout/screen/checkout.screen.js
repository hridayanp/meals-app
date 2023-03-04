import React, { useContext, useState, useEffect } from 'react';
import CreditCardComponent from '../component/credit-card.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CartContext } from '../../../services/cart/cart.context';
import { Text } from '../../../components/typography/text.component';
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing,
} from '../component/checkout.styles';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { payRequest } from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart, sum } = useContext(CartContext);
  const [name, setName] = useState('');
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    if (!card || !card.id) {
      console.log('something went wrong');
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
    }
    payRequest(card.id, sum, name)
      .then((res) => {
        console.log('res', res);
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
      })
      .catch((e) => {
        setIsLoading(false);
        navigation.navigate('CheckoutError', {
          error: err,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Spacer position="top" size="large">
            <Text>Your cart is empty!</Text>
          </Spacer>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => {
              return <List.Item title={`${item} - ${price / 100}`} />;
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />

        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardComponent
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate('CheckoutError', {
                  error: 'Something went wrong processing your credit card',
                })
              }
            />
          )}
        </Spacer>
        <Spacer position="top" size="xxl" />

        <PayButton
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
