import { Schema, model } from 'mongoose';

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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

// Database name: auth
// Collection name: users

const Auth_Model = model('users', authSchema);

export default Auth_Model;
