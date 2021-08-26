FROM node:16.6.2
ADD . /code
WORKDIR /code
RUN yarn install
EXPOSE 3000
CMD yarn start