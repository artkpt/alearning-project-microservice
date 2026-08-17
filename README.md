# alearning-project-microservice

## auth service
copy private-key.pem into auth service resources
```
openssl genrsa -out private-key.pem 2048
```

## วิธี demo in dev mode

1. สั่ง run container ด้วยคำสั่ง 
```
docker compose -f docker-compose-dev.yaml up --build -d
```

2. เข้าไป init database ผ่าน adonisjs container 
```
docker exec -it note-service sh -c "cd /app/note-service; node ace migration:fresh --seed;"
```

3. เข้า demo ผ่าน url: http://localhost:5173

## วิธี deploy

1. สั่ง run container ด้วยคำสั่ง
```
docker compose -f docker-compose-prod.yaml up --build -d
```
2. init database (ทำครั้งเดียว)
```
docker exec -it note-service-prod sh -c "cd /app/note-service; node ace migration:fresh --seed;"
```


