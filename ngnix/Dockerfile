FROM nginx:alpine

# Create a group and user
RUN addgroup -S appgroup && adduser -S www-data -G appgroup

USER www-data

COPY ./nginx.conf /etc/nginx/