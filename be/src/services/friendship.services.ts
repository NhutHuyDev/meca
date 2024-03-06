import FriendShipRequestRepo from '../models/repositories/friendshipRequest'
import FriendShipRepo from '../models/repositories/friendship.repo'

class FriendshipService {
  static getFriends = async function (userId: string) {
    const friends = await FriendShipRepo.findFriends(userId)
    return friends
  }

  static getFriendRequests = async function (userId: string) {
    const friends = await FriendShipRequestRepo.findFriendshipRequestsV2(userId)
    return friends
  }
}

export default FriendshipService
