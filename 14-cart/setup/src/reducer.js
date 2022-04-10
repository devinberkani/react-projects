const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
    };
  } else if (action.type === 'REMOVE') {
    const newItems = [
      ...state.cart.filter((cartItem) => cartItem.id !== action.payload),
    ];
    return {
      ...state,
      cart: newItems,
    };
  } else if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return {
          ...cartItem,
          amount: cartItem.amount + 1,
        };
      } else {
        return cartItem;
      }
    });
    return {
      ...state,
      cart: tempCart,
    };
  } else if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            amount: cartItem.amount - 1,
          };
        } else {
          return cartItem;
        }
      })
      .filter((cartItem) => cartItem.amount !== 0);
    //filters out all items when their amount gets to zero
    return {
      ...state,
      cart: tempCart,
    };
  } else if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  } else if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === 'DISPLAY_ITEMS') {
    return {
      ...state,
      cart: action.payload,
      loading: false,
    };
    //extra credit for combining the increase/decrease reducer functionalities
  } else if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return {
              ...cartItem,
              amount: cartItem.amount + 1,
            };
          } else if (action.payload.type === 'dec') {
            return {
              ...cartItem,
              amount: cartItem.amount - 1,
            };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return {
      ...state,
      cart: tempCart,
    };
  }
  throw new Error('no matching action type');
};

export default reducer;
