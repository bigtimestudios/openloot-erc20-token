import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddPermission } from "../generated/schema"
import { AddPermission as AddPermissionEvent } from "../generated/Vault/Vault"
import { handleAddPermission } from "../src/vault"
import { createAddPermissionEvent } from "./vault-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let _permission = 123
    let newAddPermissionEvent = createAddPermissionEvent(_addr, _permission)
    handleAddPermission(newAddPermissionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddPermission created and stored", () => {
    assert.entityCount("AddPermission", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddPermission",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddPermission",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_permission",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
