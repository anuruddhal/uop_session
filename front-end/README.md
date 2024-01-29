# Ballerina Forum Front End App 

## Run in local machine

In the project directory, you can run:

```
npm install
npm start
```

## Run in Docker

### Build Docker Image

```
docker build -f Dockerfile -t anuruddhal/forum:1.0.0 .
```

### View Docker Images
```
docker images
```

### Run Docker Image

```
docker run -d -p 3000:3000  anuruddhal/forum:1.0.0
```

### View Docker Process
```
docker ps
```

### View Docker logs
```
docker logs -f <container-id>
```

### Stop container
```
docker kill <cotainer-id>
```

### Remove Image
```
docker rmi ballerina/forum:1.0.0 
```

### Clean Up
```
docker system prune -f
```

## Run in Kubernetes

### Deploy nginx controller
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.2/deploy/static/provider/cloud/deploy.yaml
```

### Deploy ingress
curl http://api.forum.ballerina.io/api/posts