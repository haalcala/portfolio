#!/bin/bash -xe

host_dir="$(pwd | sed -e "s/\/home\/jenkins\/workspace\//\/Users\/harold\/jenkins-agent_workspace\//")"

echo host_dir $host_dir
pwd

if [ ! -d "tmp" ]; then
    mkdir tmp
fi

cp -R src tmp/
cp package.json tmp/
cp -R $WORKSPACE/health_form/webapp/reactjs/vite/dist tmp/public

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa-jenkins-agent ubuntu@$HOSTING_SERVER "mkdir -p health_form"
rsync -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ~/.ssh/id_rsa-jenkins-agent" -r tmp/ ubuntu@$HOSTING_SERVER:health_form/
