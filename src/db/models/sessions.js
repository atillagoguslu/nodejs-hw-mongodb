import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'auth', // This name is a reference to the auth collection in the database
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Database name: contacts
// Collection name: sessions

const Session_Model = model('sessions', sessionSchema);

export default Session_Model;

