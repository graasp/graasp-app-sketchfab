import { Context, PermissionLevel } from '@graasp/sdk';

import {
  MODEL_NOT_CONFIGURED_CY,
  NO_CONTENT_CY,
  QR_CODE_CY,
  QR_CODE_TAB_CY,
  VIEWER_ID,
  dataCyWrapper,
} from '../../src/config/selectors';
import { APP_SETTINGS, MODEL_SETTING } from '../fixtures/appSettings';

describe('Player View', () => {
  it('no model', () => {
    cy.setUpApi({
      appContext: { permission: PermissionLevel.Read, context: Context.Player },
    });
    cy.visit('/');
    cy.get(dataCyWrapper(MODEL_NOT_CONFIGURED_CY)).should('be.visible');
  });

  it('show nothing', () => {
    cy.setUpApi({
      appContext: { permission: PermissionLevel.Read, context: Context.Player },
      database: {
        appSettings: [MODEL_SETTING, ...APP_SETTINGS],
      },
    });
    cy.visit('/');
    cy.get(dataCyWrapper(NO_CONTENT_CY)).should('be.visible');
  });

  it('show qr code only', () => {
    cy.setUpApi({
      appContext: { permission: PermissionLevel.Read, context: Context.Player },
      database: {
        appSettings: [MODEL_SETTING, ...[APP_SETTINGS[0]]],
      },
    });
    cy.visit('/');
    cy.get(dataCyWrapper(QR_CODE_CY)).should('be.visible');
  });

  it('show model code only', () => {
    cy.setUpApi({
      appContext: { permission: PermissionLevel.Read, context: Context.Player },
      database: {
        appSettings: [MODEL_SETTING, ...[APP_SETTINGS[1]]],
      },
    });
    cy.visit('/');
    cy.get(`#${VIEWER_ID}`).should('be.visible');
  });

  it('default: show model and qr code', () => {
    cy.setUpApi({
      appContext: { permission: PermissionLevel.Read, context: Context.Player },
      database: {
        appSettings: [MODEL_SETTING],
      },
    });
    cy.visit('/');
    cy.get(`#${VIEWER_ID}`).should('be.visible');
    cy.get(dataCyWrapper(QR_CODE_TAB_CY)).click();
    cy.get(dataCyWrapper(QR_CODE_CY)).should('be.visible');
  });
});
