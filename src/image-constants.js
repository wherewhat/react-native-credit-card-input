import CreditCardsIcon from '../images/cards-icon.png';
import FrontCreditCardIcon from '../images/card-confirmed.png';
import BackCreditCardIcon from '../images/back-card-confirmed.png';
import FrontNotConfirmedCreditCardIcon from '../images/card-not-confirmed.png';
import BackNotConfirmedCreditCardIcon from '../images/back-card-not-confirmed.png';

const BackNotConfirmedCreditCardIconSize = resolveAssetSource(BackNotConfirmedCreditCardIcon);
const FrontNotConfirmedCreditCardIconSize = resolveAssetSource(FrontNotConfirmedCreditCardIcon);
const BackCreditCardIconSize = resolveAssetSource(BackCreditCardIcon);
const FrontCreditCardIconSize = resolveAssetSource(FrontCreditCardIcon);
const CreditCardsIconSize = resolveAssetSource(CreditCardsIcon);


const constants = {
  CREDIT_CARD_ICON: {
    image: CreditCardsIcon,
    width: CreditCardsIconSize.width,
    height: CreditCardsIconSize.height
  },
  FRONT_CREDIT_CARD_ICON: {
    image: FrontCreditCardIcon,
    width: FrontCreditCardIconSize.width,
    height: FrontCreditCardIconSize.height,
  },
  BACK_CREDIT_CARD_ICON: {
    image: BackCreditCardIcon,
    width: BackCreditCardIconSize.width,
    height: BackCreditCardIconSize.height
  },
  FRONT_NOT_CONFIRMED_CREDIT_CARD_ICON: {
    image: FrontNotConfirmedCreditCardIcon,
    width: FrontNotConfirmedCreditCardIconSize.width,
    height: FrontNotConfirmedCreditCardIconSize.height
  },
  BACK_NOT_CONFIRMED_CREDIT_CARD_ICON: {
    image: BackNotConfirmedCreditCardIcon,
    width: BackNotConfirmedCreditCardIconSize.width,
    height: BackNotConfirmedCreditCardIconSize.height
  },
};

module.exports = constants;