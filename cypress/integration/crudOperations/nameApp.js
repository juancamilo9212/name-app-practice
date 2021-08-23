
import { Given , Then} from "cypress-cucumber-preprocessor/steps";
import NamePage from '../Pages/NamePage';
beforeEach('Open the app', () => {

  Given('I open App page', () => {
    cy.visit('/');
  });

});

Then('I see App title',() => {
  NamePage.isTitleDisplayed();
});


