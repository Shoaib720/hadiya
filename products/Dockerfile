FROM node:16-alpine
WORKDIR /app/products
COPY package.json package-lock.json ./
RUN npm install --location=global nodemon --save-dev
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "src/index.js"]