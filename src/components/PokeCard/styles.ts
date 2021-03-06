import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  max-width: calc(33% - 10px);

  @media (max-width: 767px) {
    max-width: calc(50% - 5px);
  }

  @media (min-width: 768px) and (max-width: 1149px) {
    max-width: calc(50% - 10px);
  }

  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;

  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #eaeaea;
    border-bottom: 2px solid #eaeaea;
  }

  .img-container {
    height: 96px;
    width: 96px;
    border-radius: 12px;
    margin: 20px auto 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: var(--default-color-lightest);
      border-radius: 12px;
    }
  }

  .price-container {
    font-weight: 300;
    padding: 8px 15px 0;
    color: #444444;
    border-top: 2px solid var(--button-border-color-light);
    border-radius: 0;
    min-width: 98px;
    display: flex;
    justify-content: center;

    span {
      font-weight: 600;
      margin-left: 4px;
    }
  }

  .price-container.gradient {
    border-top-color: transparent;
  }

  .name-container {
    text-align: center;
  }
  .name-container,
  .price-container {
    margin-bottom: 7px;
    font-size: 1.8rem;
  }

  .name-container.gradient,
  .price-container.gradient {
    width: 50%;
    color: transparent;
  }

  .price-container.gradient {
    padding: 6px 0;
    width: 40%;
  }

  .buy-container {
    display: flex;
    width: 100%;

    .quantity-container {
      flex-grow: 1;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      padding: 3px;

      form label {
        overflow: hidden;
        margin: 0;
        padding: 0;
        max-width: 0;
        max-width: 0;
        position: absolute;
      }

      form input {
        font-size: 1.6rem;
        font-weight: 500;
        width: 3.5ch;
        text-align: center;
        height: 100%;
      }

      > button {
        width: 35px;
        height: 35px;

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;

        > svg {
          width: 20px;
          height: 20px;
          color: var(--button-icon-color);
        }

        &:hover {
          background-color: #efefef;
        }
        &:focus-visible {
          background-color: #efefef;
        }
        &:active {
          background-color: var(--default-color-lightest);
        }
      }
    }

    .quantity-container.gradient {
      box-shadow: unset;
      border: 0;
    }

    > button {
      margin-left: 10px;
      padding: 10px;
      font-size: 1.7rem;
      border-radius: 5px;
      color: white;
      border: 2px solid var(--button-border-color);
      color: var(--button-icon-color);
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      font-weight: 500;
      justify-content: center;

      &:disabled,
      &:disabled:hover,
      &:disabled:focus {
        background-color: #f7f7f7;
        border: 2px solid transparent;
        color: transparent;
        box-shadow: unset;
        transition: unset;
        cursor: unset;
      }

      &:hover {
        background-color: var(--default-color-lightest);
      }
      &:focus-visible {
        background-color: var(--default-color-lightest);
      }
      &:active {
        background-color: var(--button-filled-background-color);
        border-color: transparent;
        color: white;
      }

      svg {
        margin-right: 7px;
        height: 18px;
        width: 18px;
      }
    }

    @media (max-width: 1149px) {
      flex-direction: column;

      > button {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }

  .gradient {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #efefef 38%, #fafafa 54%);
    background-size: 1000px 640px;

    position: relative;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export default CardContainer;
