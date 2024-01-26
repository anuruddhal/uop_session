# Build Docker Image

## Build Image
```
docker build -t anuruddhal/mysql-forum-db:1.0.0 .
```


## Run Image
```
docker run -d -p 3306:3306 anuruddhal/mysql-forum-db:1.0.0 
```