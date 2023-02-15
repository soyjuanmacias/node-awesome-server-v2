const schema = {
  title: {
    type: String,
    required: [true, 'Debes añadir un título'],
  },

  description: {
    type: String,
    required: false,
  },
};

export default schema;
