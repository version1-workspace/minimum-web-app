
# minimum-web-app


## Run App

```bash
 node index.js
```

## Setup DB


```bash
docker compose up -d
docker exec -it minimum-web-app_db_1 mysql
# 1. Create database
# 2. Run db/schema.sql
# 3. Run db/seed.sql
```
