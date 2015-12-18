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