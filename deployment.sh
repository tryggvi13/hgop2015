#!/bin/bash
sudo service docker start
#docker push tryggvi93/tictactoe
ssh 192.168.33.10 bash -s < docker.sh
