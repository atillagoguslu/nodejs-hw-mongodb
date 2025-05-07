import { Schema, model } from 'mongoose';

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Response'ta password'ı gizlemek için
authSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// Database name: contacts
// Collection name: auth

const Auth_Model = model('auth', authSchema);

export default Auth_Model;
