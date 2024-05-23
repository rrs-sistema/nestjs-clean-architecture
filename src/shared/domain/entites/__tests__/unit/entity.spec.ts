import { validate as uuidvalidate } from "uuid"
import { Entity } from "../../entity"

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {

}

describe('UserEntity unit testes', () => {

  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(uuidvalidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '1683349f-cb43-4efa-a30e-987815a151bd'
    const entity = new StubEntity(props, id)

    expect(uuidvalidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '1683349f-cb43-4efa-a30e-987815a151bd'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })

})
