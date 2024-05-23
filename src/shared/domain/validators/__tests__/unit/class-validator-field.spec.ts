import { ClassValidatorFields } from "../../class-validator-fields";

import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {
}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize erros and validatedData variables with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validatedDate).toBeNull()
  })


  it('Should validate with erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedDate).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })


  it('Should validate without erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedDate).toStrictEqual({ field: 'value' })
    expect(sut.errors).toBeNull()
  })
})
