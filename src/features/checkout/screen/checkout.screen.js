import React, { useContext } from 'react';
import CreditCardComponent from '../component/credit-card.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CartContext } from '../../../services/cart/cart.context';
import { Text } from '../../../components/typography/text.component';
import { CartIcon, CartIconContainer } from '../component/checkout.styles';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

export const CheckoutScreen = () => {
  const { cart, restaurant, sum } = useContext(CartContext);

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
        <CreditCardComponent />
      </ScrollView>
    </SafeArea>
  );
};
