import {
  AddPermission as AddPermissionEvent,
  ClearPermissions as ClearPermissionsEvent,
  DelPermission as DelPermissionEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  UpdateERC20Limit as UpdateERC20LimitEvent
} from "../generated/Vault/Vault"
import {
  AddPermission,
  ClearPermissions,
  DelPermission,
  OwnershipTransferred,
  Paused,
  Unpaused,
  UpdateERC20Limit
} from "../generated/schema"

export function handleAddPermission(event: AddPermissionEvent): void {
  let entity = new AddPermission(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._addr = event.params._addr
  entity._permission = event.params._permission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClearPermissions(event: ClearPermissionsEvent): void {
  let entity = new ClearPermissions(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._addr = event.params._addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelPermission(event: DelPermissionEvent): void {
  let entity = new DelPermission(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._addr = event.params._addr
  entity._permission = event.params._permission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._previousOwner = event.params._previousOwner
  entity._newOwner = event.params._newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._sender = event.params._sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._sender = event.params._sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateERC20Limit(event: UpdateERC20LimitEvent): void {
  let entity = new UpdateERC20Limit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._limit = event.params._limit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
