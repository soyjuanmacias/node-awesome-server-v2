const schema = {
  name: {
    type: String,
    required: [true, 'Introduce un nombre para el usuario'],
  },

  lastName: {
    type: String,
    required: [true, 'Introduce un apellido para el usuario'],
  },

  email: {
    type: String,
    required: [true, 'Introduce un email para el usuario'],
    lowercase: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    select: false,
  },

  salt: {
    type: String,
    default: 10,
    select: false,
  },

  role: {
    type: String,
    default: 'agent',
    enum: ['admin', 'user'],
  },

  avatar: {
    type: String,
  },

  active: {
    type: Boolean,
    default: false,
  },
};

export default schema;
