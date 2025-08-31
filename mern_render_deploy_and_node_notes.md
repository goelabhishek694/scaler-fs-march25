# Deploying a MERN App on Render (Plus Node.js Internals & Scaling Notes)

We will use **Render** to deploy our app.  
👉 **Render Dashboard:** https://dashboard.render.com/

---

## Step 1: Prepare Your MERN App

1. **Set Up Your MERN App**  
   Ensure your MERN app is working perfectly on your local machine.  
   Your app should be divided into:
   - `client` (React)
   - `server` (Node.js, Express)

2. **Create a Production Build**  
   Navigate to your React client directory and run:
   ```bash
   npm run build
   ```
   This creates a production build of your React app in a `build` folder.

---

## Step 2: Set Up a Git Repository

1. **Initialize a Git Repository**
   ```bash
   git init
   ```

2. **Commit Your Code**
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Push to GitHub**
   ```bash
   git remote add origin {your-github-repo-url}
   git push -u origin main
   ```

---

## Step 3: Set Up Render Account and New Web Service

1. **Sign Up or Log In** at Render.  
2. **Create a New Web Service** → Click **New** → Select **Web Service**.

---

## Step 4: Connect to Your GitHub Repository

1. **Authorize GitHub** with Render (if not already done).  
2. **Select Repository** containing your MERN app.

---

## Step 5: Configure the Service

- **Basic Settings:**
  - **Name** → Choose a name for your service.
  - **Region** → Pick a region close to your users.

- **Build Command** (example where server code is in `server/` folder):
  ```bash
  cd client && npm install && npm run build && cd ../server && npm install
  ```

- **Start Command**:
  ```bash
  cd server && node server.js
  ```

---

## Step 6: Environment Variables

Add environment variables such as:

- `MONGODB_URI`
- `JWT_SECRET`
- Any other required keys for your app

---

## Step 7: Deploy

Click **Create Web Service**. Render will:

- Pull code from GitHub
- Install dependencies
- Build the app
- Start the server

---

## Step 8: Update `server.js` to Serve the React Build

```js
const path = require("path");
const express = require("express");
const app = express();

const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
```

### Explanation

- `app.use(express.static(clientBuildPath))`  
  Serves static assets (`.js`, `.css`, images, etc.) from `client/build`.

- `app.get("*", ...)`  
  Catch-all route to serve `index.html` for SPAs (React).  
  The `*` wildcard matches any route that hasn’t been matched by previous route handlers and lets the client-side router take over.

---

## Step 9: Remove Proxy from `client/package.json` & Update CORS in `server.js`

```js
const cors = require("cors");
const express = require("express");
const app = express();

// Example production-safe CORS (adjust origin as needed)
app.use(
  cors({
    origin: "*", // Replace with your frontend origin in production (e.g., "https://your-frontend.com")
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

> This might still give an issue if your Axios `baseURL` is still pointing to `http://localhost:3000`.  
> **Update it to your production URL** if needed.

```js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://your-app.onrender.com/", // e.g., https://test3-99k4.onrender.com/
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

- **Previous link for reference:** https://test4-ax1e.onrender.com/

---

## Handling CSP “blocked” Error with Helmet

If you receive CSP-related blocks, configure Helmet accordingly:

```js
// const helmet = require("helmet");

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://your-production-url.com"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//         imgSrc: ["'self'", "data:", "https://your-production-url.com"],
//         connectSrc: ["'self'", "https://your-production-url.com"],
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//       },
//     },
//   })
// );
```

---

# Node.js Internals, Modules, and Patterns

## Role of **libuv** in Request Handling

- **libuv** is a cross-platform C library that Node.js uses under the hood for asynchronous I/O (filesystem, networking, timers).
- **Request flow:**  
  1) OS networking layer receives a request.  
  2) libuv picks up the request and queues it for Node.js.  
  3) If Node.js is busy (e.g., CPU-bound work), libuv holds incoming requests in a queue.  
  4) Once ready, libuv forwards to Node.js for processing.  
- **Solution for CPU-intensive tasks:** delegate to a separate process (child process) or use worker threads.

📖 **Node.js Handbook:** https://flaviocopes.com/books-dist/node-handbook.pdf

---

## Key Node.js Modules

### OS Module

Create `os.js`:

```js
const os = require("os");

console.log("arch", os.arch());
console.log("cpus", os.cpus());
console.log("freemem", os.freemem());
console.log("platform", os.platform());
console.log("release", os.release());

// Network interfaces
console.log(os.networkInterfaces());
```

- `os.arch()` → CPU architecture (e.g., `arm64`)
- `os.cpus()` → array of CPU core info (model, speed, times)
- `os.freemem()` → free system memory (bytes)
- `os.platform()` → OS platform (`darwin`, `linux`, `win32`)
- `os.release()` → OS release version
- `os.networkInterfaces()` → details per interface:
  - **Name** (e.g., `en0`, `eth0`)
  - **IP addresses** (IPv4/IPv6)
  - **MAC address**
  - **Netmask**
  - **Family**

> Common interfaces on macOS:  
> `lo0` (loopback), `en0` (Wi‑Fi/Ethernet), `awdl0`/`llw0` (Apple Wireless Direct Link), `utun0..4` (virtual/VPN).

---

### Path Module

> Windows uses backslashes `\`, macOS/Linux use forward slashes `/`.  
> Use `path` to build OS-independent paths.

Create `path.js`:

```js
const path = require("path");

console.log(__dirname);

const base = path.basename(__dirname);
console.log(base);

const newPath = path.join(__dirname, "public", "abc", "file.txt");
console.log(newPath);
```

---

### FS Module

Create `fs.js`:

```js
const fs = require("fs");
const path = require("path");

// create a file
fs.writeFile("file.txt", "hello world", (err) => {
  if (err) throw err;
  console.log("data written to file");
});

// add content to the file
fs.appendFile("file.txt", "some more text", (err) => {
  if (err) throw err;
  console.log("data appended to file");
});

// read the file
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// create a directory (relative)
fs.mkdir("newDir", (err) => {
  if (err) throw err;
  console.log("Directory created");
});

// create another directory (absolute)
fs.mkdir(path.join(__dirname, "newDir2"), (err) => {
  if (err) throw err;
  console.log("Directory created");
});

// copy files from ../models/bookingModel.js to current folder
const copyFrom = path.join(__dirname, "../", "models", "bookingModel.js");
const destPath = path.join(__dirname, "bookingModelCopy.js");

fs.copyFile(copyFrom, destPath, (err) => {
  if (err) throw err;
  console.log("File copied");
});
```

---

## Project: Categorize Downloads by File Type

**Goal:** Scan the `Downloads` folder and categorize files:

- **Compressed:** `rar`, `zip`, `7z`
- **Documents:** `txt`, `xlsx`, `pdf`, `stc`
- **Audio/Video:** common media extensions

**Approach:**

1. Read the directory: `fs.readdir` / `fs.readdirSync`
2. Use `path.extname()` to get file extensions
3. Create folders per category and move files with `fs.rename` or copy with `fs.copyFile`

_Pseudocode:_

```js
const fs = require("fs");
const path = require("path");

const downloads = path.join(process.env.HOME || process.env.USERPROFILE, "Downloads");
const categories = {
  compressed: [".rar", ".zip", ".7z"],
  documents: [".txt", ".xlsx", ".pdf", ".stc"],
  media: [".mp3", ".wav", ".mp4", ".mkv", ".mov"],
};

function categorize(ext) {
  ext = ext.toLowerCase();
  for (const [name, list] of Object.entries(categories)) {
    if (list.includes(ext)) return name;
  }
  return "others";
}

for (const file of fs.readdirSync(downloads)) {
  const full = path.join(downloads, file);
  if (fs.statSync(full).isDirectory()) continue;

  const ext = path.extname(file);
  const bucket = categorize(ext);
  const destDir = path.join(downloads, bucket);
  fs.mkdirSync(destDir, { recursive: true });
  fs.renameSync(full, path.join(destDir, file));
}
```

---

## Efficiently Handling Large Files (Streams)

- Streams process data **in chunks**, avoiding loading entire files into memory.
- Many Node.js interfaces are stream-based:
  - **HTTP** request/response objects
  - **`fs`** read/write streams
  - **`zlib`**, **`crypto`** (transform streams)
- **`zlib`** integrates with streams for on-the-fly compression/decompression (e.g., gzip), used widely (PNG, ZIP, gzip, browsers).

**Stream Types:**

- **Readable**: `fs.createReadStream`
- **Writable**: `fs.createWriteStream`
- **Duplex**: sockets
- **Transform**: `zlib`, `crypto`

---

## EventEmitter Basics

The `EventEmitter` class underpins Node’s event-driven architecture.

```js
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("myEvent", (...args) => {
  console.log("There is a new event!", args);
});

const secondCb = (...args) => {
  console.log("another listener for the new event", args);
  console.log("-----------");
};
myEmitter.on("myEvent", secondCb);

// emit events
myEmitter.emit("myEvent");
myEmitter.emit("myEvent", 1, 2);
myEmitter.emit("myEvent", [1, 2, 3]);

// remove a specific listener
myEmitter.off("myEvent", secondCb);
myEmitter.emit("myEvent", "after removal");
```

**Build your own emitter (interview exercise):**

- Constructor holds:
  - an internal `events` map
- Implement:
  - `on(event, listener)`
  - `emit(event, ...args)`
  - optionally `off(event, listener)`

---

## Basic HTTP Server & Request Handling

Create a basic server:

```js
const http = require("http");
const server = http.createServer();

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Add a request listener:

```js
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("headers", req.headers, "url", req.url, "method", req.method);
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Common Request Headers Observed

- `accept: */*` → client accepts any content
- `accept-encoding: gzip, deflate, br` → supported compression types
- `connection: keep-alive` → keep TCP connection open for reuse

### Segregating by HTTP Methods

```js
server.on("request", (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World");
    res.end();
  } else if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ name: "John" })); // must stringify objects
  }
});
```

---

## MIME Types & Sniffing

- **MIME types** tell browsers how to interpret content (e.g., `text/html`, `application/json`).  
  MDN reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

- **MIME sniffing:** Browsers guessing content type from data may be abused (e.g., XSS).  
  Always set the correct `Content-Type` header to prevent misinterpretation.

---

## Project 2: Video Streaming Server (Ranges)

- Read a movie file as a stream and pipe the response.
- On the client, use HTML5 `<video>`.
- Support HTTP **Range** requests so clients can seek.

_Skeleton:_

```js
const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
  const videoPath = path.join(__dirname, "movie.mp4");
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}).listen(3000, () => console.log("Video server on :3000"));
```

---

## The Two Main Parts of Node.js

- **V8** (C++) → compiles and runs JavaScript
- **libuv** (C) → event loop, async I/O, thread pool

Other important native deps:

- **OpenSSL** → TLS/SSL crypto
- **c-ares** → DNS requests
- **http-parser** → HTTP message parsing

**Execution Order (High-Level):**

1. Application JS runs on V8  
2. Node bindings bridge JS to C/C++  
3. libuv/other native libs do async work  
4. Results callback into V8/JS

---

## Event Loop Overview

- Phases: **timers → pending callbacks → idle/prepare → poll → check → close callbacks**
- Microtasks run between phases:
  - `process.nextTick()` and resolved Promise callbacks

**Docs:** https://nodejs.org/en/guides/event-loop-timers-and-nexttick/

**Demo:**

```js
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick");
});

setImmediate(() => {
  console.log("Set Immediate");
});

console.log("End");
```

**Use case for `process.nextTick`:** break up heavy sync computations:

_Unoptimized:_

```js
function heavyComputation(iterations, callback) {
  let count = 0;
  function compute() {
    for (let i = 0; i < iterations; i++) {
      count++;
      if (count >= iterations) {
        callback();
        return;
      }
    }
  }
  compute();
}

heavyComputation(10000, () => {
  console.log("Heavy computation complete");
});
```

_Optimized:_

```js
function heavyComputation(iterations, callback) {
  let count = 0;
  function compute() {
    for (let i = 0; i < 1000; i++) {
      if (++count >= iterations) {
        callback();
        return;
      }
    }
    process.nextTick(compute);
  }
  compute();
}

heavyComputation(10000, () => {
  console.log("Heavy computation complete");
});
```

**Extra notes:**

- The event loop runs continuously until no more callbacks remain.
- Tasks in queues are **FIFO**.
- Non-blocking design enables high concurrency on a single main thread.

---

## Scaling Node.js Applications

### Cloning with the Cluster Module

```js
const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(\`Hello from Worker \${process.pid}\n\`);
    })
    .listen(8080);

  console.log(\`Worker \${process.pid} started\`);
}
```

**Benefits:**

- **Increased performance:** leverage all CPU cores
- **Fault tolerance:** dead workers are replaced

### Child Processes

- **`spawn`**: long-running processes with streamed output
- **`exec`**: run a command, buffer output (small output)
- **`fork`**: specialized `spawn` for Node.js scripts, easy IPC

### Microservices

- Decompose the application into independently deployable services for targeted scaling.

---

## Useful Links

- **Libuv**: https://libuv.org/
- **Don’t block the event loop**: https://nodejs.org/en/guides/dont-block-the-event-loop/
- **Node.js Event Loop**: https://nodejs.org/en/guides/event-loop-timers-and-nexttick/
- **MIME Types (MDN)**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

