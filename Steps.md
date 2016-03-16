# Zero to Docker in Minutes  
### Sign up for a Carina Account  

`GetCarina.com`    

### Get your API key while there  
Upper right corner; click on your username dropdown, then select API Key.  


### Install Docker  
`www.docker.com/toolbox`

### Install dvm  
Instructions are `https://github.com/getcarina/dvm`  
If using PowerShell...  
`iex (wget https://download.getcarina.com/dvm/latest/install.ps1)`


### Install Carina CLI
https://getcarina.com/docs/getting-started/getting-started-carina-cli/


### Connect to Carina
`$env:CARINA_USERNAME="don.schenck@gmail.com"
$env:CARINA_APIKEY="0a6b786add140b299868f31a21dbbf9"`


### Prove Carina
`carina list`

### Create a Cluster
`carina create mycluster`

### Get credentials for new Cluster
`carina credentials mycluster`

### "Connect" to mycluster  
by following the directions from the command ```carina credentials mycluster```


### Make sure it's the right docker client  
```dvm use```


### Check your Docker setup now  
```docker info```



### First try, an existing sample, no Dockerfile  
`docker network create wordnet`  
`docker run --detach --name mysql --net wordnet --env MYSQL_ROOT_PASSWORD=foo mysql:5.6`  


### Check the log  
```docker logs mysql```

### Wordpress to use MYSQL  
```docker run --detach --name wordpress --net wordnet --publish 80:80 --env WORDPRESS_DB_HOST=mysql --env WORDPRESS_DB_PASSWORD=my-root-pw wordpress:4.4```



### Where is it??  
```docker port wordpress 80```  
You can use the output from his command to point your web browser to your new WordPress instance.  

### Delete it all now  
```docker rm --force --volumes wordpress mysql```


### Our contrived example  
Docker and MongoDB
```docker run -d -p 27017:27017 -p 28017:28017 tutum/mongodb```  
```docker logs <container_id>```  
MONGO_URL=mongodb://admin:SX1vyOOfK62E@172.99.73.242:27017/admin


### Create a Dockerfile for the inquiry service  
Hints:  
* It uses Python
* It uses the program inquiryService.py


### Start inquiry service  
```docker run --detach -p 80:5000 -e MONGO_URL=mongodb://admin:7CTWedueaB6a@104.130.0.252:27017/admin --name inquiry inquiryservice```

### TIP  
Get inside that container: ```$ docker exec -it $(docker ps -q -l) /bin/bash```


### Initialize the database
Copy the file mongoinit.txt to the container running mongodb  
Get a command line in the container  
Run the command `mongoimport` and load the database.  


### Access the inquiry service  
use CURL or Postman or any similar tool  
`http://999.999.999.999/shoes` should return some nice JSON  
