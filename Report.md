Vagrant
B�r til og stillir stafr�n �r�unarumhverfi. Nokkurskonar wrapper fyrir t.d. VirtualBox ofl.

VirtualBox
Keyrir s�ndarv�lar

Grunt
Skipanal�nu build verkf�ri til a� hj�lpa til vi�, einfalda og automate-a keyrslu � verkefnum sem vi�komandi vill gera reglulega

npm
Sj�lfgefni pakkastj�rnandinn fyrir Node.js umhverfi�

nodejs
Cross-platform umhverfi 

bower
Pakkastj�ri fyrir JSlibraries sem leyfir ��r a� skilgreina version og n� � dependencies

docker
Docker allows you to package an application with all of its dependencies into a standardized unit for software development.

Um Deployment path-inn: � �essum t�mapunkti � verkefninu �� erum vi� me� build scriptu og deploy scriptu. 
build scriptan byrjar � a� keyra npm install og bower install. Svo er appi� builda� me� a� keyra grunt. 
Ef buildi� fail-ar ekki �� er docker image-i� builda�. Deploy er scripta sem passar upp � a� �a� a� n�jasta �tg�fan er alltaf keyrandi. 
Deploy scriptan virkar �annig a� �egar h�n er keyr� �� er n�ja docker image-i� pusha� � docker hub, development v�lin ssh-ar sig inn � test v�linna, 
test v�linn pullar n�jasta docker image-i�, terminatar gamla image-inu og keyrir �a� n�ja upp. N� er b�i� a� tengja jenkins vi� verkefni�, 
en jenkins er continious integration server sem buildar verkefni� og keyrir deploy scriptuna ef build-i� er success.

Does the load test run in serial or in parallel?
paralell
NodeJs er singlethreaded, �.e. bara einn process sem r�nnar i einu og ser um allar skipanir.
NodeJs er asynchronuous, �.e. b��ur ekki eftir a� test klari keyrslu og heldur bara �fram og r�nnar n�sta test.

Why implement the feature to track versions?
Ef eitthva� kemur upp� er mj�g gagnlegt a� geta gert rollback � stabile version

What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?
Deploy stagei� � ekki a� sj� um push �vi a� �a� � ekki a� snerta source k��ann. �a� � a� pulla og keyra.

How does the "deploy any version, anywhere" build feature work?
�egar breytingar eru ger�ar � k��a � GIT, �� �arf a� commita breytingar me� git commit og �tsk�ra breytinguna ��ur en henni er pusha� � "the mainline". 
H�gt er a� n�ta �essi commit til a� deploya hva�a versioni, � hva�a umhverfi sem er. � �essu verkefni var nota� git pluggin fyrir Jenkins og bash scriptu 
sem sshar sig inn � test umhverfi og production umhverfi og einnig notum vi� docker. Svo veljum vi� hva�a �tg�fu � verkefninu vi� viljum deploya og ip t�lu 
og l�tum docker builda image fyrir �� �tg�fu. Og svo er �a� image pusha� og runna� � hva�a umhverfi sem er.

Acceptance Stage

export DISPLAY=:0
export PATH=$PATH:/usr/local/bin
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env
./deploy.sh 8080 $GIT_UPSTREAM_HASH
export ACCEPTANCE_URL=http://192.168.33.10:8080
npm install
grunt mochaTest:acceptance

Capacity load stage

export DISPLAY=:0
export PATH=$PATH:/usr/local/bin
export ACCEPTANCE_URL=http://192.168.33.10:8080
npm install
grunt mochaTest:load

Commit stage

export DISPLAY=:0
export PATH=$PATH:/usr/local/bin
npm install
bower install
./dockerbuild.sh $GIT_COMMIT

Deploy

export DISPLAY=:0
export PATH=$PATH:/usr/local/bin
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env
./deployment.sh 9000 $GIT_UPSTREAM_HASH

