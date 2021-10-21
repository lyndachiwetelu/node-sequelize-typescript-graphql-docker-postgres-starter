FROM node:14-alpine

WORKDIR /app

ENV ENVIRONMENT=development

COPY package.json /app

RUN apk --no-cache --virtual build-dependencies add \
    python \
    && yarn install --silent \
    && apk del build-dependencies

COPY . /app
RUN yarn global add ts-node
RUN yarn global add typescript

CMD ["sh", "-c", "yarn migrate --up && yarn dev"]

EXPOSE 4001