import { onDatePickerPage } from "../../../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../../../support/page_objects/formLayoutPage"
import { navigateTo, onNavigationPage } from "../../../support/page_objects/navigationPage"
import { onSmartTablePage } from "../../../support/page_objects/smartTablePage"


//menggunakan source support/page_objects
describe('Test with Page Objects', () => {

    beforeEach('Open Applicartion', () => {
        cy.openHomePage()
    })

    it('Verify navigation across the pages', () => {
        navigateTo.formLayoutPage()
        navigateTo.datepicketPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })

    it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () =>{
        navigateTo.formLayoutPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Dudi', 'dudi@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('dudi@test.com', 'password')
        
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(1, 2)
        
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWWithFirstAndLastName('Dudi', 'Widyarsa')
        onSmartTablePage.updateAgeByFirstname('Dudi', '30')
        onSmartTablePage.deleteRowByIndex(1)


    })

})