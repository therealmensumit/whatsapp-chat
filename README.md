# One-on-One Chat (React + Tailwind + Socket.IO)

Real-time private chat. Open the app, enter your name, and you get a link like
`https://your-app/?room=k3m9xq`. Send it to one person; when they open it and enter a name,
you are chatting. Only two people can be in a room.

## Run locally (development)
```bash
npm install
npm run dev        # client http://localhost:5173, server :3001
```
Open the link in two browser windows (use a private window for the second) to test.

## Run as one server (production mode)
```bash
npm install
npm run build
npm start          # http://localhost:3001 serves the app and the websocket
```

## Share with people on the internet
Anyone can only open your link if the server is reachable online. Two options:

1. **Quick test:** run `npm run build && npm start`, then expose it with a tunnel:
   `npx ngrok http 3001` (or Cloudflare Tunnel). Share the https URL it prints.
2. **Permanent (recommended):** deploy to any Node host that supports websockets
   (Render, Railway, Fly.io). Build command: `npm install && npm run build`.
   Start command: `npm start`. The host provides the `PORT` variable automatically.

## Structure
```
server/index.js          Express + Socket.IO (rooms, 2-user limit, history, typing, presence)
src/
  App.jsx                join flow + chat screen
  hooks/useChat.js       socket connection and chat state
  components/            JoinScreen, ChatWindow, ChatHeader, MessageBubble,
                         MessageInput, TypingIndicator, InviteBanner, Avatar
  utils/time.js          time format, room id, avatar colour
```

## Notes
- Messages are kept in server memory (last 500 per room, rooms expire after 24h idle) and
  are lost if the server restarts. Add a database (e.g. SQLite/Postgres) for permanent history.
- Anyone who has the link can join an empty seat, so share it only with the intended person.
  Add login if you need stronger identity.
