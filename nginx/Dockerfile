FROM nginx:alpine

RUN rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

COPY ./nginx.conf /etc/nginx/