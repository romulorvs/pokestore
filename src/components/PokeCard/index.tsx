import React, { useCallback, useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus, FiShoppingCart } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import CardContainer from './styles';
import { useAppContext } from '../../AppProvider';
import { typeIds, TypeNames } from '../../services/interfaces';

export interface PokemonApiData {
  id: number;
  base_experience: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      dream_world: {
        front_default: string | null;
      };
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonData extends PokemonApiData {
  price: number;
  quantity: number;
  img_url: string;
}

interface PokerCardProps extends TypeNames {
  url: string;
}

const PokeCard: React.FC<PokerCardProps> = ({ url, typeName }) => {
  const {
    appContext,
    setAppContext,
    getStoredContext,
    fetchPokemonData,
  } = useAppContext();

  const [itemQuantity, setItemQuantity] = useState('1');
  const [typeId] = useState(typeIds[typeName].id);
  const [cardData, setCardData] = useState<PokemonData | null>(null);
  const [input_id] = useState(uuid());

  useEffect(() => {
    (async () => {
      const newCardData = await fetchPokemonData(url);
      setCardData(newCardData);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handlePlusClick = useCallback(() => {
    if (!cardData) return;

    let quantity = cardData.quantity + 1;
    if (quantity > 99) {
      quantity = 99;
    } else if (quantity < 1) {
      quantity = 1;
    }

    if (Number.isNaN(quantity)) {
      quantity = 1;
    }

    setCardData({
      ...cardData,
      quantity,
      price: cardData.base_experience * quantity,
    });

    setItemQuantity(quantity.toString());
  }, [cardData]);

  const handleMinusClick = useCallback(() => {
    if (!cardData) return;

    let quantity = cardData.quantity - 1;
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 99) {
      quantity = 99;
    }

    if (Number.isNaN(quantity)) {
      quantity = 1;
    }

    setCardData({
      ...cardData,
      quantity,
      price: cardData.base_experience * quantity,
    });

    setItemQuantity(quantity.toString());
  }, [cardData]);

  const handleAddToCart = useCallback(() => {
    if (!cardData) return;

    const newCart = appContext[typeId].cart.slice(0); // copying cart array
    const cartIndex = newCart.findIndex(pokemon => pokemon.id === cardData.id);

    if (cartIndex >= 0) {
      newCart[cartIndex] = {
        ...newCart[cartIndex],
        unitaryPrice: cardData.base_experience,
        quantity: cardData.quantity + newCart[cartIndex].quantity,
      };
      newCart[cartIndex].totalPrice =
        newCart[cartIndex].quantity * newCart[cartIndex].unitaryPrice;
    } else {
      newCart.push({
        id: cardData.id,
        name: cardData.name,
        imgurl: cardData.img_url,
        unitaryPrice: cardData.base_experience,
        quantity: cardData.quantity,
        totalPrice: cardData.quantity * cardData.base_experience,
      });
    }

    const storedContext = getStoredContext();

    const newAppContext = {
      ...storedContext,
      [typeId]: {
        ...storedContext[typeId],
        cart: newCart,
      },
    };
    setAppContext(newAppContext);

    setCardData({
      ...cardData,
      quantity: 1,
      price: cardData.base_experience,
    });

    setItemQuantity('1');
  }, [appContext, cardData, setAppContext, typeId, getStoredContext]);

  const handleQuantityChange = useCallback(
    (newVal: string) => {
      if (!cardData) return;

      const newIntVal = parseInt(newVal, 10);

      let quantity = newIntVal;
      if (newIntVal > 99) {
        quantity = 99;
      } else if (newIntVal < 1) {
        quantity = 1;
      }

      if (Number.isNaN(newIntVal) || Number.isNaN(quantity)) {
        quantity = 1;
      }

      setCardData({
        ...cardData,
        quantity,
        price: cardData.base_experience * quantity,
      });

      setItemQuantity(newVal.trim() === '' ? '' : quantity.toString());
    },

    [cardData],
  );

  if (!cardData) {
    return (
      <CardContainer>
        <div className="card-container">
          <div className="img-container gradient" />
          <div className="name-container gradient">Transparent</div>
          <div className="price-container gradient">Transparent</div>
        </div>
        <div className="buy-container">
          <div className="quantity-container gradient" />
          <button
            aria-label="Add Item to Cart"
            type="button"
            className="gradient"
            disabled
          >
            <FiShoppingCart />
            Adicionar
          </button>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div className="card-container">
        <div className="img-container">
          <img src={cardData.img_url} alt={cardData.name} />
        </div>
        <div className="name-container">{cardData.name}</div>
        <div className="price-container">
          R$ <span>{cardData.price}</span>
        </div>
      </div>
      <div className="buy-container">
        <div className="quantity-container">
          <button
            aria-label="Reduce Quantity"
            type="button"
            onClick={handleMinusClick}
          >
            <FiMinus />
          </button>
          <form
            action="/"
            onSubmit={e => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <input
              type="number"
              id={`card_quantity_${input_id}`}
              min={1}
              max={99}
              step={1}
              value={itemQuantity}
              onChange={e => handleQuantityChange(e.target.value)}
              onBlur={() => {
                if (!itemQuantity.trim()) {
                  setItemQuantity('1');
                }
              }}
            />
            <label htmlFor={`card_quantity_${input_id}`}>Quantidade</label>
          </form>
          <button
            aria-label="Increase Quantity"
            type="button"
            onClick={handlePlusClick}
          >
            <HiPlus />
          </button>
        </div>
        <button
          aria-label="Add Item to Cart"
          type="button"
          onClick={handleAddToCart}
        >
          <FiShoppingCart />
          Adicionar
        </button>
      </div>
    </CardContainer>
  );
};

export default PokeCard;
