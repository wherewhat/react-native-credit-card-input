import React, { Component, PropTypes } from "react";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";
import AppConstants from "../../../../common/constants";
import ImageConstants from '../../../../common/image-constants';

const s = StyleSheet.create({
  container: {
    backgroundColor:'#FFFFFF'
  },
  form: {
    marginTop: 20,
    marginBottom: 20
  },
  inputContainer: {
    marginLeft: 20,
    marginBottom:10,
  },
  inputLabel: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
  },
});

const CVC_INPUT_WIDTH = AppConstants.SCREEN_SIZE.width;
const EXPIRY_INPUT_WIDTH = AppConstants.SCREEN_SIZE.width;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = AppConstants.SCREEN_SIZE.width;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: View.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    cardBrandIcons: PropTypes.object,

    allowScroll: PropTypes.bool,
  };

  static defaultProps = {
    cardViewSize: {},
    labels: {
      name: "CARDHOLDER'S NAME",
      number: "",
      expiry: "",
      cvc: "",
      postalCode: "POSTAL CODE",
    },
    placeholders: {
      name: "Full Name",
      number: "Card Number",
      expiry: "MM/YY",
      cvc: "CVC",
      postalCode: "34567",
    },
    inputContainerStyle: {
      flexDirection:'row',
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    allowScroll: false,
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    };
  };

  render() {
    const {
      cardImageFront, cardImageBack, inputContainerStyle,
      values: { number, expiry, cvc, name, type }, focused,
      allowScroll, requiresName, requiresCVC, requiresPostalCode,
      cardScale, cardFontFamily, cardBrandIcons,
    } = this.props;

    return (
      <View style={s.container}>
        <ScrollView ref="Form"
            keyboardShouldPersistTaps
            scrollEnabled={allowScroll}
            showsHorizontalScrollIndicator={false}
            style={s.form}>
          <CCInput {...this._inputProps("number")} img={this.props.isValidNumber ? ImageConstants.FRONT_CREDIT_CARD_ICON.image : ImageConstants.FRONT_NOT_CONFIRMED_CREDIT_CARD_ICON.image}
              containerStyle={[s.inputContainer, inputContainerStyle, { width: CARD_NUMBER_INPUT_WIDTH }]} />
          <CCInput {...this._inputProps("expiry")}
              containerStyle={[s.inputContainer, inputContainerStyle, { width: EXPIRY_INPUT_WIDTH }]} />
          { requiresCVC &&
            <CCInput {...this._inputProps("cvc")} img={this.props.isValidCVC ? ImageConstants.BACK_CREDIT_CARD_ICON.image : ImageConstants.BACK_NOT_CONFIRMED_CREDIT_CARD_ICON.image}
                containerStyle={[s.inputContainer,{}, { width: CVC_INPUT_WIDTH }]} /> }
        </ScrollView>
      </View>
    );
  }
}
