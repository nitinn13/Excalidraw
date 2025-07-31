# ✏️Draft Space – Real-time Collaborative Whiteboard by nitin

A full-stack, real-time collaborative whiteboard application built using **Turborepo** with **Next.js** frontend, **Express.js** backend, and a dedicated **WebSocket server**.

This project is inspired by [Excalidraw](https://excalidraw.com) and adds features like authentication, drawing persistence, real-time sync, and image export.

---

## 🏗️ Tech Stack

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **WebSocket Server:** `ws` library for real-time collaboration
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** JWT-based auth
- **Deployment:** AWS EC2

---

## ✨ Features

- 🖌️ **Real-time Drawing:** Collaborate with others in shared whiteboard rooms
- 🧩 **Multi-user Rooms:** Unique room IDs for isolated sessions
- 🔐 **Authentication:** Sign up and sign in functionality using JWT
- 💾 **Save & Load Drawings:** Persist canvas data to PostgreSQL
- ↩️ **Undo / Redo History:** Maintain drawing history even after reconnect
- 🖼️ **Export as Image:** Download your canvas as a `.png`
- ⚡ **Turborepo Architecture:** Separate apps for frontend, backend, and ws server

---

## 🧱 Turborepo Structure

excalidraw-clone/
├── apps/
│ ├── frontend/ → Next.js app (drawing UI)
│ ├── backend/ → Express.js app (API routes)
│ └── ws/ → WebSocket server
├── packages/
│ ├── db/ → Prisma schema & database utils
│ └── config/ → Shared ESLint, TS config, etc.

--- 
<img width="1895" height="1001" alt="image" src="https://github.com/user-attachments/assets/437a55c7-8f8d-4094-9966-90841606b250" />

<img width="1919" height="1000" alt="image" src="https://github.com/user-attachments/assets/e93a9204-f1c1-4c13-9661-131b93c42de6" />
