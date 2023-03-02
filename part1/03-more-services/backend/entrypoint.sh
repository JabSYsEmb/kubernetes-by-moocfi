#!/bin/sh

## Read in the file of environment settings
export $(cat /home/project/.env)

"$@"
