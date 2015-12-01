### Before starting
Make sure you've applied fixes for day 1. Remember creating your "report.md" and "aboutme.md"

### DOCKER

Docker is already installed on centOs dev machine, however, it is not automatically started on boot time.
Check if the docker daemon is already running:

``` 
docker ps
``` 
If it complains that docker is not running, ensure the service is running by typing
``` 
sudo service docker start
docker ps
``` 
If it still complains, contact the teacher.

* Create account on docker.com, <yourname> refers to docker username. This is neccessary in order to be able to do docker push
* Edit dockerbuild.sh and exchange "gulli" with your username.
 
``` 
npm install
bower install
./dockerbuild.sh
``` 


``` 
docker run -p 9000:8080 -d -e "NODE_ENV=production" <yourname>/tictactoe
``` 

Navigate to http://localhost:9000  and you should have yeoman landing page again, now served from withing a docker image
within a virtual machine!

Challange: Find out how to configure our setup so you access the landing page running on docker on a different port, 
such as http://localhost:9090


Now publish your docker image to dockerhub:
* run 
``` 
docker login
docker push <yourname>/tictactoe"
```

Now you have your image published on dockerhub.


### Create your test environment
We will start by creating our production-like test environment. At this point, it is very simple, we will use a
pre-canned vagrantbox for this.

Create your test virtualmachine somewhere outside your src working directory.
- note: in a real team environment this virtual machine would be run on a server.
- If your computer has limited resources, you can use a cloud service to host the box.

In a directory of your choosing run

```
vagrant init webdevops/ubuntu-docker
```
Edit the Vagrantfile generated and add:
```
  config.vm.network "forwarded_port", guest: 9000, host: 9090
```

Then start the server vm
```
vagrant up
```
This will take a while, do this early.

vagrant ssh into this server, you should be able to run the following successfully. Remember, <yourname> is your 
dockerhub account name.

``` 
docker run -p 8080:8080 -d -e "NODE_ENV=production" <yourname>/tictactoe
``` 

At this point, you have a dev environment and a production-test environment, but they are manually linked.


### Write a deployment script.

Write a bash script which you can execute from within your development machine which automatically deploys
current version of your sources to your production-test environment. 
* Assume that the docker image has been built, but not pushed.
* The script must push to docker from your dev machine, and pull from docker on the test machine.
* You will need to shut down the old version of the app and then run the new version in docker.
* You may need to configure your vagrant boxes to use a private network to achieve this.
* Hint: Use ssh remote execution.
* Try to figure this out on your own, resist the temptation to look over the shoulder of the next person.


### Add to the report
Add to your report started yesterday the topology of the deployment path so far. Also, add to the description of
components asked for on day one, how they relate to the concepts introduced in the lectures so far, especially 
"release antipatterns".


### Hints 
* Docker command order is kill, rm, pull, run. Use --name parameter to make this easy.
* Start with making sure you can execute each step successfully from the command line before integrating into script and testing in build.
* ./dockerbuild.sh must exit with failure if grunt fails, or if docker build fails. 
  [Exit shell script based on exit code](http://stackoverflow.com/questions/90418/exit-shell-script-based-on-process-exit-code). 
  Good way to fail build is to modify a test to fail.
  
* You must set up communication to test server to happen without interaction needed. Use static ip addresses
 issued by Vagrant to establish fixed ip numbers, and ssh for non-interactive script execution. See
 [Configuring private networks](https://docs.vagrantup.com/v2/networking/private_network.html)
 and 
 [SSH passwordless login](http://www.tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps/)
 
* Do not include docker push in ./dockerbuild.sh
