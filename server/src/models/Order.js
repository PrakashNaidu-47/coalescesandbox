class OrderStore {
  constructor() {
    this.orders = [
      {
        id: 'ord-101',
        orderNumber: 'C-1041',
        customer: 'user-student',
        customerName: 'Alex Johnson',
        items: [
          {
            menuItemId: 'item-1',
            name: 'Masala Dosa with Chutney',
            quantity: 2,
            priceAtPurchase: 65,
            specialInstructions: 'Extra crispy'
          }
        ],
        totalAmount: 130,
        status: 'PREPARING',
        paymentStatus: 'PAID',
        paymentMethod: 'WALLET',
        pickupToken: 'A-02',
        createdAt: new Date(Date.now() - 1000 * 60 * 12),
        updatedAt: new Date()
      }
    ];
    this.tokenCounter = 43;
  }

  findAll(query = {}) {
    let results = [...this.orders];
    if (query.customer) {
      results = results.filter(o => o.customer === query.customer);
    }
    if (query.status) {
      results = results.filter(o => o.status === query.status);
    }
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  findById(id) {
    return this.orders.find(o => o.id === id);
  }

  create(orderData) {
    const tokenNum = this.tokenCounter++;
    const pickupToken = 'T-' + String(tokenNum).padStart(2, '0');
    const orderNumber = 'C-' + (1000 + tokenNum);

    const newOrder = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customer: orderData.customer,
      customerName: orderData.customerName || 'Campus Patron',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'PENDING',
      paymentStatus: 'PAID',
      paymentMethod: orderData.paymentMethod || 'ONLINE',
      pickupToken,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateStatus(id, status) {
    const order = this.findById(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
    }
    return order;
  }
}

module.exports = new OrderStore();