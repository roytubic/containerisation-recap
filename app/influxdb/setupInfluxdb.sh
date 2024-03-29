#!/bin/bash

echo "Checking jq installation..."
jq --version

# Starts influxdb
echo "Starting InfluxDB service..."
influxd &

# Waiting for InfluxDB...
echo "Waiting for InfluxDB to start..."
# while ! curl -s "$INFLUX_API/health" | grep -q "pass"; do
#   sleep 5
# done
sleep 10

echo "InfluxDB is ready."

# Create intitial user and get auth id
echo "Creating initial bucket, organisation and admin user..."
SETUP_RESPONSE=$(curl -X POST "$INFLUX_API/setup" -H "Content-type: application/json" -d '{"bucket": "'$BUCKET_NAME'", "org": "'$ORG_NAME'", "username": "'$USERNAME'"}')
echo "Raw setup response: $SETUP_RESPONSE"
echo '{"auth":{"token":"test-token"},"org":{"id":"test-org-id"},"bucket":{"id":"test-bucket-id"}}' | jq -r '.auth.token'
AUTH_TOKEN=$(echo $SETUP_RESPONSE | jq -r '.auth.token')
echo ${AUTH_TOKEN}
ORG_ID=$(echo $SETUP_RESPONSE | jq -r '.org.id')
echo ${ORG_ID}
BUCKET_ID=$(echo $SETUP_RESPONSE | jq -r '.bucket.id')
echo ${BUCKET_ID}

# Create a write only user for test bucket
echo "Creating write user..."
USER_ID=$(curl -X POST "$INFLUX_API/users" -H "Authorization: Token $AUTH_TOKEN" -H "Content-type: application/json" -d '{"name": "'$WRITE_USER'", "org_id": "'$ORG_ID'"}' | jq -r '.id')
echo ${USER_ID}

# Edit write user to have a password
echo "Assigning password to write user..."
curl -X POST "$INFLUX_API/users/${USER_ID}/password" -H "Authorization: Token $AUTH_TOKEN" -H "Content-type: application/json" -d '{"password": "'${WRITE_USER_PASSWORD}'"}'

# Give write and read access to the bucket for the write user
echo "Giving permissions to the write user..."
PERMISSIONS=$(cat <<EOF
{    
    "orgID": "$ORG_ID",
    "permissions": [
        {"action": "read", "resource": {"type": "buckets", "id": "$BUCKET_ID"}},
        {"action": "write", "resource": {"type": "buckets", "id": "$BUCKET_ID"}}
    ],
    "userID": "$USER_ID"
}
EOF
)
INFLUXDB_USER_TOKEN=$(curl -X POST "$INFLUX_API/authorizations" -H "Authorization: Token $AUTH_TOKEN" -H "Content-type: application/json" -d "$PERMISSIONS" | jq -r '.token')
echo ${INFLUXDB_USER_TOKEN}

wait