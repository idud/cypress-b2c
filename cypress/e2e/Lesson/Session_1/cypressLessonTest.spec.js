/// <reference types="cypress" />

describe('First Lesson', () => {

    it.only('first test', () => {

        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different Attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

})

describe('Second Lesson', () => {
    
    it.only('first test', () => {

        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different Attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    // menggunakan only jika terdapat banyak testcase yang di running yang terdapat operator only
    it.only('second test', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button') // Find disini untuk mencari button yang ada di dalam parent yang terpada #inputEmail3
            .should('contain', 'Sign in') // assert button yang terdapat string Sign in
            .parents('form') // kembali lagi ke parent form agar bisa menggunakan .find karena .find mencari child jadi harus mendahulukan parent
            .find('nb-checkbox') // berhasil mendapatkan attribute checkbox
            .click() // memerintahkan untuk click checkbox

        //mencari string "Horizontal Form didalam attribute parent nb-card lalu mencari attribute field [type="email"]"
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]') 

    })

})

describe('Third Lesson', () => {

    it.only('then and wrap method', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // // tidak bisa menyederhanakan seperti 3 row code dibawah ini karena cypress merupakan asyncronous harus merubahnya ke cypress style
        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // // CYPRESS STYLE
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            // menggunakan .text() karena style code berubah menjadi jQuery object 'firstForm'
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text() 
            const passwordlabelFirst = firstForm.find('[for="inputPassword2"]').text()
            // assertion disini berubah menjadi expect (chai assertion) pun krn menggunakan jQuery methods
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordlabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordlabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordlabelFirst).to.equal(passwordlabelSecond)

                // agar merubahnya menjadi context cypress maka kita bisa menggunakan syntax wrap seperti dibawah ini :
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    })

})

describe('Fourth Lesson', () => {

    it.only('invoke command', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
    
        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).equal('Email address')
        })

        //3
        // kegunaan invoke untuk mengambil value disini contoh text yang akan di assert
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        //Dibawah ini sample untuk mengambil value checkbox checked
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')

            //assertion opsi 1
            //.should('contain', 'checked')

            //assertion opsi 2
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })

    })
    //Dibawah ini sample untuk mengambil value date picker dimana 
    //value tersimpan didalam properties DOM
    it.only('assert property', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-navigation').click()
            cy.get('nb-calendar-year-cell').contains('2022').click()
            cy.get('nb-calendar-month-cell').contains('Jan').click()
            cy.get('nb-calendar-day-cell').contains('17').click()

            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jan 17, 2022')
           
        })

    })
})

describe('Fifth Lesson', () => {

    it.only('radio button', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButton => {
            cy.wrap(radioButton)
                .first()
                //clicking the button by passing the option 'force' as true
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButton)
                // penggunaan eq($num) jika didalam element terdapat banyak data (index array)
                .eq(1)
                .check({force: true})

            cy.wrap(radioButton)
                .eq(0)
                .should('not.be.checked')
               
            cy.wrap(radioButton)
                .eq(2)
                .should('be.disabled')
        })
    })

    it.only('check boxes', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})
        cy.get('[type="checkbox"]').eq(2).click({force: true})

        // NOTES
        // check() and click() method differentiate
        // check() only work with elements of type checkbox and radio button
        // also check() method only work with input elements and input elements should be checkbox or radio button
        // check method can pick and check multiple checkboxes
        // check method only can check your checkbox but cant uncheck your checkboxes
    })
})

describe('Sixth Lesson', () => {

    it.only('lists and dropdowns', () => {
        
        cy.visit('http://localhost:4200/')

        //1 Verify 1 data yang tersedia dari list option
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')


        //2 verify semua data yg tersedia dari list option dgn syntax each loop
        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim() //penggunaan text untuk ambil value string text karena terdapat spasi di semua value maka menggunakan trim

                const colors = {
                    "Light" : "rgb(255, 255, 255)",
                    "Dark" : "rgb(34, 43, 69)",
                    "Cosmic" : "rgb(50, 50, 89)",
                    "Corporate" : "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3){
                    cy.wrap(dropDown).click()
                }

            })
        })
    })
})

describe('Seventh Lesson', () => {

    it.only('Web tables', () => {
        
        cy.visit('http://localhost:4200/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //2 
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Dudi')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Widyarsa')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Dudi')
            cy.wrap(tableColumns).eq(3).should('contain', 'Widyarsa')
        })

        //3
        cy.get('thead [placeholder="Age"]').type('20')
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
        })

        //4
        const age = [20, 30, 40, 200]
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
            })
        })
    })
})

describe('Eighth Lesson', () => {

    it.only('Web tables', () => {
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {
                month: 'short'
            })
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            // get current date
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                // kondisi jika date attribute tidak include current month
                // maka akan klik button next month
                // baru click tanggal tersebut
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    selectDayFromCurrent(day)
                } else {
                    // jika tanggal saat ini include current month langsung click tanggal ybs
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(130)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })
})

describe('Ninth Lesson', () => {
    it.only('tooltip', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('browser dialog box', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // method 1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // mothod 2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        // jika window tidak muncul maka stub akan kosong
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            // jika stub kosong maka tidak akan ada message assertion disini
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // method 3 jika ingin confirm cancel
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })
})

describe('Tenth Lesson', () => {
    
    it.only('first test', () => {

        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        // refer to https://docs.cypress.io/guides/references/assertions#BDD-Assertions
        //assertion method 1
        cy.get('[for="exampleInputEmail1"]')
            .should('contain','Email address')
            .should('have.class', 'label')

        //assertion method 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
        })

        //assertion method 3
        cy.get('[for="exampleInputEmail1"]')
            .should('contain','Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        //assertion method 4
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        

    })
    //assertion method 5
    it.only('Web tables', () => {
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {
                month: 'short'
            })
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            // get current date
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                // kondisi jika date attribute tidak include current month
                // maka akan klik button next month
                // baru click tanggal tersebut
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    selectDayFromCurrent(day)
                } else {
                    // jika tanggal saat ini include current month langsung click tanggal ybs
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(130)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })
})