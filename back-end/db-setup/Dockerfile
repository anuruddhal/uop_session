# Use an official MySQL image as the base image
FROM mysql:8-oracle

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=dummypassword
ENV MYSQL_DATABASE=forum_database
ENV MYSQL_USER=forum_user
ENV MYSQL_PASSWORD=dummypassword

# Copy the initialization SQL script into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306