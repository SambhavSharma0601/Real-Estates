import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({

  email: String,
  problemDescription: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;

