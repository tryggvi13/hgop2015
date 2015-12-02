docker stop container 
docker kill container
docker rm container
docker pull tryggvi93/tictactoe
docker run -p 8080:8080 -d --name="container" -e "NODE_ENV=production" tryggvi93/tictactoe

