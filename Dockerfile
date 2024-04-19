ARG ALPINE_VERSION=3.18

FROM node:21-alpine${ALPINE_VERSION} AS builder

WORKDIR /redub

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

FROM node:21-alpine${ALPINE_VERSION}

COPY --from=builder /redub/node_modules ./node_modules
COPY --from=builder /redub/package*.json ./
COPY --from=builder /redub/prisma ./prisma
COPY --from=builder /redub/src ./src

ENV YARN_VERSION 1.22.22

RUN apk add --no-cache --virtual .build-deps-yarn curl \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz \
    && apk del .build-deps-yarn

RUN chmod 755 /src/scripts/init.sh
RUN chmod 755 /src/scripts/wait-for-it.sh