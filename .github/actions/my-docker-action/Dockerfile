FROM alpine:3.12

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Give execution permissions
RUN chmod +x /entrypoint.sh

# Define the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
