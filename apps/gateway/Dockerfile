FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build gateway

FROM node:alpine as production

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN ըառն install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/gateway/main"]
