#!/bin/bash

host_dir="$(pwd | sed -e "s/\/home\/jenkins\/workspace\//\/Users\/harold\/jenkins-agent_workspace\//")"

echo host_dir $host_dir

if [ ! -d "tmp" ]; then
    mkdir tmp
fi

cp -R src tmp/
cp package.json tmp/
cp ../../../webapp/reactjs/vite/dist tmp/public

docker build -t haalcala/health_form_server:latest $host_dir/tmp