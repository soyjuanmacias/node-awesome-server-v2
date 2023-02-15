import { Types } from 'mongoose';

const schema = {
  name: {
    type: String,
    unique: true,
    required: [true, 'Debes introducir un nombre para la entidad'],
  },

  web: {
    type: String,
    required: false,
  },

  photoUrl: {
    type: String,
    required: false,
  },

  photoUrl: {
    type: String,
    required: false,
  },

  createdBy: {
    type: Types.ObjectId,
    ref: 'users',
  },

  editedBy: {
    type: Types.ObjectId,
    ref: 'users',
  },

  type: {
    type: String,
    enum: ['bank_entity', 'colaborator', 'tech_platform', 'others'],
    default: 'others',
  },

  mainContact: {
    type: String,
    default: '0',
  },

  contacts: {
    type: Array,
    default: [],
  },
};

export default schema;
