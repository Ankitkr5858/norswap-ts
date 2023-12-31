// @ts-nocheck
// @ts-nocheck
import { Order } from '@gelatonetwork/limit-orders-lib'

export enum ORDER_CATEGORY {
  Open = 0,
  History = 1,
}

export enum LimitOrderStatus {
  OPEN = 'open',
  CANCELLED = 'cancelled',
  EXECUTED = 'executed',
}

export interface LimitOrderTableProps {
  orders: Order[]
  orderCategory: ORDER_CATEGORY
  isCompact: boolean
}
