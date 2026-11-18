class UserStore {
  constructor() {
    this.users = [
      {
        id: 'user-admin',
        name: 'Canteen Admin',
        email: 'admin@campusbite.edu',
        passwordHash: '$2a$10$dummyhashadmin',
        role: 'ADMIN',
        campusId: 'ADM-001',
        phone: '9876543210',
        createdAt: new Date()
      },
      {
        id: 'user-staff',
        name: 'Chef Mario',
        email: 'staff@campusbite.edu',
        passwordHash: '$2a$10$dummyhashstaff',
        role: 'STAFF',
        campusId: 'STF-001',
        phone: '9876543211',
        createdAt: new Date()
      },
      {
        id: 'user-student',
        name: 'Alex Johnson',
        email: 'student@campusbite.edu',
        passwordHash: '$2a$10$dummyhashstudent',
        role: 'CUSTOMER',
        campusId: 'STU-2024-042',
        phone: '9876543212',
        createdAt: new Date()
      }
    ];
  }

  findByEmail(email) {
    return this.users.find(u => u.email === email.toLowerCase());
  }

  findById(id) {
    return this.users.find(u => u.id === id);
  }

  create(userData) {
    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      passwordHash: userData.passwordHash,
      role: userData.role || 'CUSTOMER',
      campusId: userData.campusId || '',
      phone: userData.phone || '',
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
}

module.exports = new UserStore();