docker-compose up --build -d
docker-compose exec auth-service npx prisma db push
docker-compose exec ecommerce-service npx prisma db push
docker-compose exec api-gateway npx prisma db push
docker-compose exec api-gateway npx prisma db seed