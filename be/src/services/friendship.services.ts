import FriendShipRepo from '../models/repositories/friendShip.repo'

class FriendshipService {
  static getFriends = async function (userId: string) {
    const friends = await FriendShipRepo.findFriends(userId)
    return friends
  }
}

export default FriendshipService
