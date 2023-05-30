import {
  RESULT_CARD_CY,
  SEARCH_INPUT_CY,
  SELECT_BUTTON_CY,
  SETTINGS_BUTTON_CY,
  SHOW_MODEL_SWITCH_CY,
  SHOW_QR_CODE_SWITCH_CY,
  dataCyWrapper,
} from '../../src/config/selectors';
import { CONTEXTS, PERMISSION_LEVELS } from '../../src/config/settings';
import { APP_SETTINGS } from '../fixtures/appSettings';

describe('Builder View', () => {
  beforeEach(() => {
    cy.setUpApi({
      database: {
        appSettings: APP_SETTINGS,
      },
      appContext: {
        permission: PERMISSION_LEVELS.ADMIN,
        context: CONTEXTS.BUILDER,
      },
    });
    cy.visit('/');
  });

  it('layout & search', () => {
    // check model endpoint returns data
    cy.get(dataCyWrapper(RESULT_CARD_CY)).should('exist');

    // test search
    // no result
    cy.get(dataCyWrapper(SEARCH_INPUT_CY)).type('anysearcg');
    cy.get(dataCyWrapper(RESULT_CARD_CY)).should('not.exist');

    const search = 'owl';
    cy.get(dataCyWrapper(SEARCH_INPUT_CY)).clear().type(search);
    cy.get(dataCyWrapper(RESULT_CARD_CY)).should('exist');

    // select model
    cy.get(dataCyWrapper(RESULT_CARD_CY)).first().click();
    cy.get(dataCyWrapper(SELECT_BUTTON_CY)).click();
    cy.wait(1000);
    cy.get(dataCyWrapper(RESULT_CARD_CY))
      .first()
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('settings', () => {
    cy.get(dataCyWrapper(SETTINGS_BUTTON_CY)).click();
    // show set defined settings
    cy.get(dataCyWrapper(SHOW_MODEL_SWITCH_CY))
      .click()
      .then(($el) => {
        expect($el.attr('class')).to.include('checked');
      });
    cy.get(dataCyWrapper(SHOW_QR_CODE_SWITCH_CY))
      .click()
      .then(($el) => {
        expect($el.attr('class')).to.include('checked');
      });
  });
});
