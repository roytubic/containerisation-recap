# Use an appropriate base image
FROM debian:bullseye-slim

# # Set environment variables
ARG INFLUXDB_VERSION
ARG INFLUX_API
ARG ORG_NAME
ARG BUCKET_NAME
ARG USERNAME
ARG ADMIN_PASSWORD
ARG WRITE_USER
ARG WRITE_USER_PASSWORD

# Set environment variables
ENV INFLUXDB_VERSION=$INFLUXDB_VERSION \
    INFLUX_API=$INFLUX_API \
    ORG_NAME=$ORG_NAME \
    BUCKET_NAME=$BUCKET_NAME \
    USERNAME=$USERNAME \
    ADMIN_PASSWORD=$ADMIN_PASSWORD \
    WRITE_USER=$WRITE_USER \
    WRITE_USER_PASSWORD=$WRITE_USER_PASSWORD

# Install dependencies
RUN apt-get update && apt-get install -y curl jq file

# Download and install InfluxDB
RUN curl -L https://dl.influxdata.com/influxdb/releases/influxdb2-${INFLUXDB_VERSION}_linux_amd64.tar.gz -o influxdb.tar.gz \
    && tar zxvf influxdb.tar.gz \
    && INFLUXD_PATH=$(find . -name influxd -type f) \
    && echo "InfluxD found at: ${INFLUXD_PATH}" \
    && cp ${INFLUXD_PATH} /usr/local/bin/influxd \
    && rm -rf influxdb.tar.gz influxdb2-${INFLUXDB_VERSION}

# Download jQuery
RUN curl -L -o jquery-latest.min.js "https://code.jquery.com/jquery-latest.min.js"

# Copy your script into the Docker image
COPY setupInfluxdb.sh /setupInfluxdb.sh
RUN chmod +x /setupInfluxdb.sh

# Set the entrypoint to run your script
ENTRYPOINT ["/setupInfluxdb.sh"]

# Run and Expose on localhost:8086
EXPOSE 8086
