FROM eclipse-mosquitto

COPY mosquitto.conf /tmp.txt
RUN cat /tmp.txt > /mosquitto/config/mosquitto.conf
RUN rm /tmp.txt