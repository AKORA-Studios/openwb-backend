This project is aiming to build a better usable REST API for the openWB project that can be securely exposed to the public internet to then be used by mobile applications.

# Structure

![Diagram1](./assets/Diagram_1.png)
The application is split into 3 services. Firstly a ngnix instance running as a reverse proxy that encrypts the traffic. Then a redis instance that is used to temporarely buffer values, and the actual web server parsing and answering request but also saving the values to an external database. There are two external services required, a OpenWB instance running in the same network, and a MariaDB instance that is used to save the values permanently.

![Diagram2](./assets/Diagram_2.png)
The first and most obvious event loop is of course the webserver itself handling api requests that get forwarded by the ngnix server. But besides the REST API there is another event loop, the service listens to the MQTT values published by the OpenWB and saves them on the redis instance. This is done to decouple the rest of the service from the MQTT connection. The API then request all the values it needs from the redis instance which only holds the latest values for each topic. The service also saves some values to an external database in a contant interval. Again the redis instance allows this process to be decoupled from the MQTT connection, this way the interval of the datapoints in the database can be guaranteed to always have a contant user chosen time offset between them.

# Future goals

### User profiles

-   User profiles linked to RFID
-   Individual charging mode
-   Individual charging current
-   Export individual charging log to CSV or even PDF

### Error monitoring and reporting

Currently all errors that the service encounters are just saved to the docker logs, if the service constanly crashes it can take days to notice which will result in a dataloss. Because this project is currently only used by personally this is not a huge issue, but this is definetly something that needs to be addressed in the future.

### Websocket

Some of the values need to be contantly refreshed which is currently achieved by sending GET requests in a contant interval. A websocket would be a much better solution to this problem, as the values received through the MQTT connection can be parsed, converted and directly sent to the clients which would provide a good experience to the users.
