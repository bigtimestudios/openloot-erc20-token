import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddPermission,
  ClearPermissions,
  DelPermission,
  OwnershipTransferred,
  Paused,
  Unpaused,
  UpdateERC20Limit
} from "../generated/Vault/Vault"

export function createAddPermissionEvent(
  _addr: Address,
  _permission: i32
): AddPermission {
  let addPermissionEvent = changetype<AddPermission>(newMockEvent())

  addPermissionEvent.parameters = new Array()

  addPermissionEvent.parameters.push(
    new ethereum.EventParam("_addr", ethereum.Value.fromAddress(_addr))
  )
  addPermissionEvent.parameters.push(
    new ethereum.EventParam(
      "_permission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_permission))
    )
  )

  return addPermissionEvent
}

export function createClearPermissionsEvent(_addr: Address): ClearPermissions {
  let clearPermissionsEvent = changetype<ClearPermissions>(newMockEvent())

  clearPermissionsEvent.parameters = new Array()

  clearPermissionsEvent.parameters.push(
    new ethereum.EventParam("_addr", ethereum.Value.fromAddress(_addr))
  )

  return clearPermissionsEvent
}

export function createDelPermissionEvent(
  _addr: Address,
  _permission: i32
): DelPermission {
  let delPermissionEvent = changetype<DelPermission>(newMockEvent())

  delPermissionEvent.parameters = new Array()

  delPermissionEvent.parameters.push(
    new ethereum.EventParam("_addr", ethereum.Value.fromAddress(_addr))
  )
  delPermissionEvent.parameters.push(
    new ethereum.EventParam(
      "_permission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_permission))
    )
  )

  return delPermissionEvent
}

export function createOwnershipTransferredEvent(
  _previousOwner: Address,
  _newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "_previousOwner",
      ethereum.Value.fromAddress(_previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("_newOwner", ethereum.Value.fromAddress(_newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(_sender: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("_sender", ethereum.Value.fromAddress(_sender))
  )

  return pausedEvent
}

export function createUnpausedEvent(_sender: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("_sender", ethereum.Value.fromAddress(_sender))
  )

  return unpausedEvent
}

export function createUpdateERC20LimitEvent(_limit: BigInt): UpdateERC20Limit {
  let updateErc20LimitEvent = changetype<UpdateERC20Limit>(newMockEvent())

  updateErc20LimitEvent.parameters = new Array()

  updateErc20LimitEvent.parameters.push(
    new ethereum.EventParam("_limit", ethereum.Value.fromUnsignedBigInt(_limit))
  )

  return updateErc20LimitEvent
}
