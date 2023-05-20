FROM node

# Build app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY tsconfig.json .
COPY src ./src
COPY public ./public
RUN npm run build

CMD ["npm", "start"]
