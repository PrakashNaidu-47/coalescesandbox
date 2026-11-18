class MenuItemStore {
  constructor() {
    this.items = [
      {
        id: 'item-1',
        name: 'Masala Dosa with Chutney',
        description: 'Crispy fermented crepe stuffed with spiced potato mash, served with coconut chutney and sambar.',
        price: 65,
        category: 'Breakfast',
        imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600',
        isAvailable: true,
        dietaryTags: ['Veg', 'Gluten-Free'],
        createdAt: new Date()
      },
      {
        id: 'item-2',
        name: 'Paneer Tikka Wrap',
        description: 'Tandoori spiced paneer cubes wrapped in a soft rumali roti with mint mayo and crunchy onions.',
        price: 110,
        category: 'Snacks',
        imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
        isAvailable: true,
        dietaryTags: ['Veg', 'Spicy'],
        createdAt: new Date()
      },
      {
        id: 'item-3',
        name: 'South Indian Thali Meal',
        description: 'Wholesome campus lunch plate: Steamed rice, dal, sambar, rasam, poriyal, curd, and sweet.',
        price: 130,
        category: 'Meals',
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3ca55c?auto=format&fit=crop&q=80&w=600',
        isAvailable: true,
        dietaryTags: ['Veg', 'Jain'],
        createdAt: new Date()
      },
      {
        id: 'item-4',
        name: 'Cold Coffee with Ice Cream',
        description: 'Rich blended iced coffee topped with a generous scoop of vanilla ice cream and chocolate drizzle.',
        price: 75,
        category: 'Beverages',
        imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600',
        isAvailable: true,
        dietaryTags: ['Veg'],
        createdAt: new Date()
      },
      {
        id: 'item-5',
        name: 'Choco Lava Cake',
        description: 'Warm molten chocolate cake with a gooey center that melts in your mouth.',
        price: 90,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
        isAvailable: false,
        dietaryTags: ['Veg'],
        createdAt: new Date()
      },
      {
        id: 'item-6',
        name: 'Aloo Samosa (2 pcs)',
        description: 'Golden fried crispy pastry filled with savory spiced potatoes and peas.',
        price: 35,
        category: 'Snacks',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
        isAvailable: true,
        dietaryTags: ['Veg', 'Spicy'],
        createdAt: new Date()
      }
    ];
  }

  findAll(query = {}) {
    let results = [...this.items];
    if (query.category && query.category !== 'All') {
      results = results.filter(i => i.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.search) {
      const s = query.search.toLowerCase();
      results = results.filter(i => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }
    if (query.isAvailable !== undefined) {
      results = results.filter(i => i.isAvailable === query.isAvailable);
    }
    return results;
  }

  findById(id) {
    return this.items.find(i => i.id === id);
  }

  create(itemData) {
    const newItem = {
      id: 'item-' + Date.now(),
      name: itemData.name,
      description: itemData.description || '',
      price: Number(itemData.price),
      category: itemData.category,
      imageUrl: itemData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      isAvailable: itemData.isAvailable !== undefined ? itemData.isAvailable : true,
      dietaryTags: itemData.dietaryTags || ['Veg'],
      createdAt: new Date()
    };
    this.items.push(newItem);
    return newItem;
  }

  updateStock(id, isAvailable) {
    const item = this.findById(id);
    if (item) {
      item.isAvailable = isAvailable;
    }
    return item;
  }
}

module.exports = new MenuItemStore();