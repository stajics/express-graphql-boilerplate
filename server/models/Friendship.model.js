const mongoose = require('mongoose');

const FRIENDSHIP_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED'
}

const Friendship = new mongoose.Schema({
  from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String,
    enum: [FRIENDSHIP_STATUS.ACCEPTED, FRIENDSHIP_STATUS.PENDING],
    default: FRIENDSHIP_STATUS.PENDING,
    trim: true,
  }
});

class FriendshipClass {
  toResponse() {
    const responseObj = this.toObject();

    return responseObj;
  }
}

Friendship.loadClass(FriendshipClass);

module.exports = {
  FRIENDSHIP_STATUS,
  Friendship: mongoose.model('Friendship', Friendship)
}
