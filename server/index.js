import express from "express";
import http from "http";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 3001;

const MAX_USERS = 2;          // one-on-one only
const MAX_HISTORY = 500;      // messages kept per room (in memory)
const ROOM_TTL = 24 * 60 * 60 * 1000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true } });

/** rooms: roomId -> { users: Map<clientId,{name,socketId,online}>, messages: [], updated } */
const rooms = new Map();

const peerOf = (room, clientId) => {
  for (const [id, u] of room.users) {
    if (id !== clientId) return { name: u.name, online: u.online };
  }
  return null;
};

io.on("connection", (socket) => {
  let ctx = null; // { room, clientId }

  socket.on("join", (payload, ack) => {
    const reply = typeof ack === "function" ? ack : () => {};
    const roomId = String(payload?.room || "");
    const clientId = String(payload?.clientId || "").slice(0, 64);
    const name = String(payload?.name || "").trim().slice(0, 30);

    if (!/^[A-Za-z0-9_-]{4,32}$/.test(roomId) || !clientId || !name) {
      return reply({ ok: false, error: "Invalid room or name." });
    }

    let room = rooms.get(roomId);
    if (!room) {
      room = { users: new Map(), messages: [], updated: Date.now() };
      rooms.set(roomId, room);
    }

    if (!room.users.has(clientId) && room.users.size >= MAX_USERS) {
      return reply({ ok: false, error: "This chat already has two people. Ask for a new link." });
    }

    room.users.set(clientId, { name, socketId: socket.id, online: true });
    room.updated = Date.now();
    socket.join(roomId);
    ctx = { room: roomId, clientId };

    reply({ ok: true, history: room.messages, peer: peerOf(room, clientId) });
    socket.to(roomId).emit("peer", { name, online: true });
  });

  socket.on("message", (text) => {
    if (!ctx) return;
    const room = rooms.get(ctx.room);
    const user = room?.users.get(ctx.clientId);
    const body = String(text || "").trim().slice(0, 2000);
    if (!room || !user || !body) return;

    const msg = { id: randomUUID(), clientId: ctx.clientId, name: user.name, text: body, ts: Date.now() };
    room.messages.push(msg);
    if (room.messages.length > MAX_HISTORY) room.messages.shift();
    room.updated = Date.now();
    io.to(ctx.room).emit("message", msg);
  });

  socket.on("typing", (isTyping) => {
    if (ctx) socket.to(ctx.room).emit("typing", !!isTyping);
  });

  socket.on("disconnect", () => {
    if (!ctx) return;
    const room = rooms.get(ctx.room);
    const user = room?.users.get(ctx.clientId);
    if (user && user.socketId === socket.id) {
      user.online = false;
      socket.to(ctx.room).emit("peer", { name: user.name, online: false });
      socket.to(ctx.room).emit("typing", false);
    }
  });
});

// Remove idle rooms
setInterval(() => {
  const cutoff = Date.now() - ROOM_TTL;
  for (const [id, room] of rooms) if (room.updated < cutoff) rooms.delete(id);
}, 60 * 60 * 1000);

app.get("/health", (_req, res) => res.send("ok"));

if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get("*", (_req, res) => res.sendFile(path.join(DIST, "index.html")));
} else {
  app.get("/", (_req, res) =>
    res.send("API running. Run `npm run build` to serve the React app from here, or use `npm run dev`.")
  );
}

server.listen(PORT, () => console.log(`Chat server running on http://localhost:${PORT}`));
