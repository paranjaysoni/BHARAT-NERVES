FROM node:20-alpine3.16

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache openssl && npm install

COPY . .

RUN npx prisma generate
RUN npm run build


EXPOSE 4000

COPY start.sh .
RUN chmod +x start.sh
CMD ["sh", "./start.sh"]
