export enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Cancelled,
}

export function getOrderStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return 'Замовлення очікує на обробку'

    case OrderStatus.Shipped:
      return 'Замовлення було відправлено'

    case OrderStatus.Delivered:
      return 'Замовлення доставлено'

    case OrderStatus.Cancelled:
      return 'Замовлення скасовано'

    default:
      throw new Error('Невідомий статус замовлення')
  }
}