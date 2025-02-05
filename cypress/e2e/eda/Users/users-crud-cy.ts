//Tests a user's ability to create, edit, and delete Users in the EDA UI.
import { randomString } from '../../../../framework/utils/random-string';

describe('EDA Users- Create, Edit, Delete', () => {
  before(() => {
    cy.edaLogin();
  });

  it.skip('can create a User, select role(s) to add the user to, and assert the information showing on the details page', () => {
    const userDetails = {
      Username: `E2E User ${randomString(4)}`,
      FirstName: 'Firstname',
      LastName: 'Lastname',
      Email: 'first.last@redhat.com',
      Password: `${randomString(12)}`,
    };
    cy.navigateTo(/^Users$/);
    cy.contains('h1', 'Users');
    cy.clickButton(/^Create user$/);
    cy.typeInputByLabel(/^Username$/, userDetails.Username);
    cy.typeInputByLabel(/^First name$/, userDetails.FirstName);
    cy.typeInputByLabel(/^Last name$/, userDetails.LastName);
    cy.typeInputByLabel(/^Email$/, userDetails.Email);
    cy.typeInputByLabel(/^Password$/, userDetails.Password);
    cy.typeInputByLabel(/^Password confirmation$/, userDetails.Password);
    // TODO: needs further work when Users page is functional
    /*
    Roles selection
     */
    cy.selectDropdownOptionByLabel(/^User type$/, 'Super user');
    cy.selectDropdownOptionByLabel(/^Roles(s)$/, 'User Experience');
    cy.clickButton(/^Create user$/);
    cy.hasDetail('First name', userDetails.FirstName);
    cy.hasDetail('Last name', userDetails.LastName);
    cy.hasDetail('Email', userDetails.Email);
    cy.hasDetail('Username', userDetails.Username);
    cy.getEdaUserByName(userDetails.Username).then((user) => {
      cy.wrap(user).should('not.be.undefined');
      if (user) {
        cy.deleteEdaUser(user);
      }
    });
  });

  it.skip('can edit a User including the roles the user belongs to', () => {
    cy.createEdaUser().then((edaUser) => {
      cy.navigateTo(/^Users$/);
      cy.get('h1').should('contain', 'Users');
      cy.clickTableRow(edaUser.name);
      cy.clickPageAction(/^Edit user$/);
      cy.hasTitle(`/^Edit user$/`);
      cy.typeInputByLabel(/^Username$/, edaUser.name);
      cy.typeInputByLabel(/^First name$/, edaUser.name + 'edited firstname');
      cy.typeInputByLabel(/^Last name$/, edaUser.name + 'edited lastname');
      cy.typeInputByLabel(/^Email$/, 'edited@redhat.com');
      cy.typeInputByLabel(/^Password$/, edaUser.password);
      cy.typeInputByLabel(/^Password confirmation$/, edaUser.password);
      cy.selectDropdownOptionByLabel(/^User type$/, 'Regular user');
      cy.selectDropdownOptionByLabel(/^Roles(s)$/, 'Engineering');
      cy.clickButton(/^Save user$/);
      cy.hasDetail('Firstname', edaUser.name + 'edited firstname');
      cy.hasDetail('Lastname', edaUser.name + 'edited lastname');
      cy.hasDetail('Email', edaUser.name + 'edited lastname');
      cy.hasDetail('First name', `${edaUser.name} edited firstname`);
      cy.hasDetail('Last name', `${edaUser.name} edited lastname`);
      cy.hasDetail('User type', 'Regular user');
      cy.hasDetail('Roles(s)', 'Engineering');
      cy.navigateTo(/^Users$/);
      cy.deleteEdaUser(edaUser);
    });
  });

  it.skip('can delete a User', () => {
    cy.createEdaUser().then((edaUser) => {
      cy.navigateTo(/^Users$/);
      cy.get('h1').should('contain', 'Users');
      cy.clickTableRow(edaUser.name);
      cy.hasTitle(edaUser.name);
      cy.intercept('DELETE', `/api/eda/v1/users/${edaUser.id}/`).as('deleteUser');
      cy.clickPageAction(/^Delete user$/);
      cy.clickModalConfirmCheckbox();
      cy.clickModalButton('Delete user');
      cy.wait('@deleteUser').then((deleteuser) => {
        expect(deleteuser?.response?.statusCode).to.eql(204);
        cy.hasTitle(/^Users$/);
      });
    });
  });
});
