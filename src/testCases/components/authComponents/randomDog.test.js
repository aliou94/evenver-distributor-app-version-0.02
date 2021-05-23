



function validate(values) {
    let errors = {
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        cell: undefined,
        userPassword: undefined,
        password: undefined,
    };
    if (!values.email) {
        errors.email ="validation required"
    }
    if (!values.firstName) {
        errors.firstName = "validation required"
    }
    if (!values.lastName) {
        errors.lastName = "validation required"
    }
    if (!values.userPassword) {
        errors.userPassword = "validation required"
    }
    if (!values.password) {
        errors.password = "validation required"
    }

    return errors
}


const myMock =jest.fn()



test("results returned",()=>{
    console.log(myMock());
    myMock.mockReturnValueOnce(10)
    expect(myMock).toBe(10);

})