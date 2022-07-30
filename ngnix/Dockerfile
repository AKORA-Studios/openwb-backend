FROM nginx:alpine

# Create a group and user
RUN addgroup -S www-data && adduser -S www-data -G www-data

USER www-data

COPY ./nginx.conf /etc/nginx/