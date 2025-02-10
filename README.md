to run

1. Copy the repo
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
