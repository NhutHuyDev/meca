## Meca
This is a simple chat application, with basic features, created for research and learning purposes.

- Authentication & Authorization: Secure login and registration using JWT, email verification with OTP, and refresh token rotation.

- User Management: View and update user information.

- Friend Management: Send, accept, and manage friend requests.

- One-to-One Chat: Real-time messaging with 'sent/seen' status and unread message counts.

- Group Chat: Real-time group messaging with status updates for sent messages and unread message tracking.

## How to Run
### Prerequisites
- Node v20

- ```Docker``` installed

### Run whole application
```
docker compose up -d
```
*Ensure that you provide the OAuth2 credentials of backend service in docker-compose.yml for Nodemailer before proceeding.*

## Technologies used in the project

### Backend
- Express & Typescript

- Validation with Zod

- Nodemailer through Gmail SMTP via Google OAuth2

- MongoDB database & Mongoose ODM

- Socket.IO 

### Frontend
- React & Typescript

- Redux & Redux toolkit for state management

- Axios for REST API requests

- Form handling and validation using React-Hook-Form & Zod

- Radix UI library & Tailwind CSS

## Folder structure
The entire project is divided into 3 main folders

- **/be**: Handles HTTP requests according to REST API standards

- **/realtime**: Handles real-time events with the socket.IO library

- **/fe**: Taking full responsibility for the frontend

### Backend
There are 3 main folders in **/be/src**: 

- **/routes**: Defines URLs to resources, apply middleware (error, not found, and validation handler)

- **/controllers**: Get payload fields and call necessary services

- **/services**: Contains the main logic processing 

![meca-be-workflow.drawio.svg](./docs/be-workflow.drawio.svg)
    
### Realtime services
There are 3 main folders in **/realtime/src**: 

- **/io**: List events and subscribe to them

- **/ioMiddlewares**: Apply middleware (authentication, validation handler)

- **/services**: Contains the main logic processing 

![meca-realtime-workflow.drawio.svg](./docs/realtime-workflow.drawio.svg)

### Frontend
There are 8 main folders in **/fe/src**: 
- **/components**: Contains child components of pages and reusable components

- **/pages**: Contains components that are application pages

- **/routes**: Defines the corresponding paths and components

- **/realtime**: Register to listen to events from the real-time server and contain emit functions of events

- **/redux**: Defines the general store, slices, and reducers

- **/form**: Form components will be stored in there

- **/lib/formSchema**:  Contains the schemas defined by Zod used for validating forms

- **/theme**: Define color codes and text properties

## Database diagram
![meca-database-diagram.drawio.svg](./docs/db.drawio.svg)

## Appendix
### List of REST APIs

#### Authentication & authorization APIs
|Method|Resource|Description|
|---|---|---|
|POST|/v1/api/users/request-verify-otp|Request OTP code by Nodemailer through Gmail|
|POST|/v1/api/users/verify|Verify email with OTP code|
|POST|/v1/api/users/|Sign up|
|POST|/v1/api/auth/sign-in|Sign in|
|POST|/v1/api/auth/sign-out|Sign out|
|POST|/v1/api/auth/refresh|Refresh access token using Refresh token rotation technique|
|POST|/v1/api/auth/forgot-password|Request reset password code through Gmail|
|POST|/v1/api/auth/reset-password/:userId/:passwordResetCode|Update new password|

#### User APIs
|Method|Resource|Description|
|---|---|---|
|GET|/v1/api/users/me|Get current user information|
|PATCH|/v1/api/users/|Update current user information|
|GET|/v1/api/users/get-others|Get other users|

#### Friend APIs
|Method|Resource|Description|
|---|---|---|
|GET|/v1/api/friends/|Get friends of current user|
|GET|/v1/api/friends/requests/|Get friend requests of current user|
 
#### ChatOneToOne APIs
|Method|Resource|Description|
|---|---|---|
|GET|/v1/api/chat/individual/|Get all individual chats|
|GET|/v1/api/chat/individual/:chatOneToOneId|Get the details of a chat (messages, status of the last message)|

#### Chat Group APIs
|Method|Resource|Description|
|---|---|---|
|GET|/v1/api/chat/group/|Get all group chats|
|GET|/v1/api/chat/group/:chatGroupId|Get the details of a chat (messages, status of the last message)|

### List of Real-time Events with Socket.IO

#### Friend events
|Event name|Description|
|---|---|
|friend:send_request|Listen on when a friend request is sent from the current user to a user|
|friend:new_request|Emit to a user when receiving a new friend request|
|friend:request_success|Emit to the current user when successfully sending a friend request|
|friend:accept_request|Listen on when the current user accepts a friend request|
|friend:accepted_success|Emit to the current user when their request to accept a friend request is successful|
|friend:new_friend|Emit to a user when their friend request is accepted |
|friend:cancel_request|Listen on when the current user cancels their friend request|
|friend:cancel_success|Emit to the current user when their request to cancel a friend request is successful|    
|friend:reject_request|Listen on when the current user rejects a user's friend request|
|friend:reject_success|Emit to the current user when their request to reject a friend request is successful|
|friend:un_friend|Listen on when the current user unfriends a user|
|friend:un_friend_success|Emit to the current user when their request to unfriend a user is successful|

#### Chat events
|Event name|Description|
|---|---|
|chat:send_message|Listen on when the sender sends a message to the recipient|
|chat:new_message|Emit to sender & recipient to update messages in the current chat|
|chat:clear_unread|Listen on when the recipient reads messages|
|chat:user_seen|Emit to the sender when the recipient has read messages|

#### Group events
|Event name|Description|
|---|---|
|group:create|Listen on when the current user creates a group|
|group:create_success|Emit to users who are members there is a new group|
|group:send_message|Listen on when the current user sends a message to the current group|
|group:new_message|Emit to members to update messages in the current chat|
|group:clear_unread|Listen on when members read messages|
|group:user_seen|Emit to the current user when members have read their messages|

## References
[1]. Code With Shreyansh. (2022, October 19). Modern React Chat App Full Course. YouTube. https://www.youtube.com/watch?v=bSbHeUrUPwQ
