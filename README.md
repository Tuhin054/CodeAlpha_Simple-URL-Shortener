# Simple URL Shortener

A small URL shortener backend built with Node.js, Express, and MongoDB.

## Setup

1. Install Node.js and start a local MongoDB server.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Set the values in `.env` (the following defaults work with local MongoDB):

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will be available at `http://localhost:3000`.

## Test the endpoints

Create a short URL:

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d "{\"originalUrl\":\"https://example.com/very/long/link\"}"
```

The response contains a `shortUrl`, for example:

```json
{"shortUrl":"http://localhost:3000/Ab3xYz9"}
```

Open the returned URL (replace the example code with the one from your response) to follow the redirect:

```bash
curl -i http://localhost:3000/Ab3xYz9
```
