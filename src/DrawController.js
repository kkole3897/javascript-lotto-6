import { MissionUtils } from "@woowacourse/mission-utils";
import LottoNumberValidator from "./LottoNumberValidator.js";
import { MESSAGES } from "./constants.js";

class DrawController {
  static async getWinningNumbers() {
    const winningNumbersText = await MissionUtils.Console.readLineAsync("");

    return winningNumbersText;
  }

  static checkOnlyAllowedWinningNumbers(text) {
    const pattern = /^(\d?\s?,?)+$/;

    return pattern.test(text);
  }

  static checkWinningNumbersCount(numbers) {
    return LottoNumberValidator.checkNumbersCount(numbers);
  }

  static checkWinningNumbersInRange(numbers) {
    return LottoNumberValidator.checkAllNumbersInRange(numbers);
  }

  static checkWinningNumbersUnique(numbers) {
    return LottoNumberValidator.checkAllNumbersUnique(numbers);
  }

  static processWinningNumbersText(text) {
    if (!DrawController.checkOnlyAllowedWinningNumbers(text)) {
      throw new Error(MESSAGES.winningNumberNotAllowedCharacterError);
    }

    const textNumbers = text
      .split(",")
      .map((text) => text.trim())
      .filter((text) => text.length > 0);

    if (!DrawController.checkWinningNumbersCount(textNumbers)) {
      throw new Error(MESSAGES.winningNumbersCountError);
    }

    const numbers = textNumbers.map((number) => parseInt(number));

    if (!DrawController.checkWinningNumbersInRange(numbers)) {
      throw new Error(MESSAGES.winningNumberRangeError);
    }

    if (!DrawController.checkWinningNumbersUnique(numbers)) {
      throw new Error(MESSAGES.duplicatedWinningNumbersError);
    }

    return numbers;
  }

  static async getBonusNumber() {
    const bonusNumberText = await MissionUtils.Console.readLineAsync("");

    return bonusNumberText;
  }

  static checkBonusNumberTextOnlyNumber(text) {
    const pattern = /^\d+$/;

    return pattern.test(text);
  }

  static checkBonusNumberInRange(number) {
    return LottoNumberValidator.checkNumberInRange(number);
  }

  static checkWinningBonusDifferent({ winningNumbers, bonusNumber }) {
    return !winningNumbers.includes(bonusNumber);
  }

  
  static processBonusNumberText(text) {
    const textNumber = text.trim();

    if (!DrawController.checkBonusNumberTextOnlyNumber(textNumber)) {
      throw new Error(MESSAGES.bonusNumberNotAllowedCharacterError);
    }

    const bonusNumber = parseInt(textNumber);

    if (!DrawController.checkBonusNumberInRange(bonusNumber)) {
      throw new Error(MESSAGES.bonusNumberRangeError);
    }

    return bonusNumber;
  }

  static compareWinningBonus({ winningNumbers, bonusNumber }) {
    if (!this.checkWinningBonusDifferent({ winningNumbers, bonusNumber })) {
      throw new Error(MESSAGES.winningBonusIncludeError);
    }
  }
}

export default DrawController;
