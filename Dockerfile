ARG ALPINE_VERSION=3.18

FROM node:21-alpine${ALPINE_VERSION}

ENV YARN_VERSION 1.22.22

RUN apk add --no-cache --virtual .build-deps-yarn curl \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz \
    && apk del .build-deps-yarn

RUN mkdir /home/node/redub

COPY ./ /home/node/redub

WORKDIR /home/node/redub

RUN npm install

RUN npx prisma generate

USER node

CMD ["yarn", "dev"]