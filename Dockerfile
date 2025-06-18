
FROM node:22
WORKDIR /app
COPY server/ ./server
COPY client/build ./server/build
WORKDIR /app/server
RUN npm install
EXPOSE 3001
CMD [ "node", "index.js" ]