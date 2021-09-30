FROM node:14-alpine

WORKDIR /app

ENV ENVIRONMENT=development

COPY package.json /app
RUN yarn install --silent
COPY . /app
RUN yarn global add ts-node
RUN yarn global add typescript

CMD ["sh", "-c", "yarn migrate --up && yarn dev"]

EXPOSE 4001