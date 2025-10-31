docker-compose up --build
docker-compose exec api-gateway npx prisma db push
docker-compose exec api-gateway npx prisma db seed