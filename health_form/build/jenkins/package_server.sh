#!/bin/bash -xe

host_dir="$(pwd | sed -e "s/\/home\/jenkins\/workspace\//\/Users\/harold\/jenkins-master_home\//")"

echo host_dir $host_dir
pwd

if [ ! -d "tmp" ]; then
    mkdir tmp
fi

cp -R src tmp/
cp package.json tmp/
cp -R $WORKSPACE/health_form/webapp/reactjs/vite/dist tmp/public

docker build -t haalcala/health_form_server:latest $host_dir/tmp