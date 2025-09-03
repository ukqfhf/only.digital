FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "serve"]
