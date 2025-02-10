to run

1. clone the repo
2. install dependencies

```bash
pnpm install
```

3. run the db

```bash
  docker-compose up
```

4. run the migrations

```bash
  pnpm drizzle-kit generate
  pnpm drizzle-kit migrate
```

5. run the server

```bash
  pnpm run start:dev
```

6.  Check all the endpoints in the .rest file (download the extension)
