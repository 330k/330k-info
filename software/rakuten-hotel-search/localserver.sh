#!/bin/bash

docker run --rm -v $(pwd):/usr/share/nginx/html:ro -p 8081:80 nginx
