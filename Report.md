Vagrant
Býr til og stillir stafræn þróunarumhverfi. Nokkurskonar wrapper fyrir t.d. VirtualBox ofl.

VirtualBox
Keyrir sýndarvélar

Grunt
Skipanalínu build verkfæri til að hjálpa til við, einfalda og automate-a keyrslu á verkefnum sem viðkomandi vill gera reglulega

npm
Sjálfgefni pakkastjórnandinn fyrir Node.js umhverfið

nodejs
Cross-platform umhverfi 

bower
Pakkastjóri fyrir JSlibraries sem leyfir þér að skilgreina version og ná í dependencies

docker
Docker allows you to package an application with all of its dependencies into a standardized unit for software development.

Um Deployment path-inn: Á þessum tímapunkti í verkefninu þá erum við með build scriptu og deploy scriptu. 
build scriptan byrjar á að keyra npm install og bower install. Svo er appið buildað með að keyra grunt. 
Ef buildið fail-ar ekki þá er docker image-ið buildað. Deploy er scripta sem passar upp á að það að nýjasta útgáfan er alltaf keyrandi. 
Deploy scriptan virkar þannig að þegar hún er keyrð þá er nýja docker image-ið pushað á docker hub, development vélin ssh-ar sig inn á test vélinna, 
test vélinn pullar nýjasta docker image-ið, terminatar gamla image-inu og keyrir það nýja upp. Nú er búið að tengja jenkins við verkefnið, 
en jenkins er continious integration server sem buildar verkefnið og keyrir deploy scriptuna ef build-ið er success.

Does the load test run in serial or in parallel?
paralell
NodeJs er singlethreaded, þ.e. bara einn process sem rönnar i einu og ser um allar skipanir.
NodeJs er asynchronuous, þ.e. bíður ekki eftir að test klari keyrslu og heldur bara áfram og rönnar næsta test.

Why implement the feature to track versions?
Ef eitthvað kemur uppá er mjög gagnlegt að geta gert rollback á stabile version

What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?
Deploy stageið á ekki að sjá um push þvi að það á ekki að snerta source kóðann. Það á að pulla og keyra.

How does the "deploy any version, anywhere" build feature work?
Þegar breytingar eru gerðar á kóða í GIT, þá þarf að commita breytingar með git commit og útskýra breytinguna áður en henni er pushað á "the mainline". 
Hægt er að nýta þessi commit til að deploya hvaða versioni, í hvaða umhverfi sem er. Í þessu verkefni var notað git pluggin fyrir Jenkins og bash scriptu 
sem sshar sig inn á test umhverfi og production umhverfi og einnig notum við docker. Svo veljum við hvaða útgáfu á verkefninu við viljum deploya og ip tölu 
og látum docker builda image fyrir þá útgáfu. Og svo er það image pushað og runnað í hvaða umhverfi sem er.

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

