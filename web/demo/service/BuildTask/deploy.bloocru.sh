#!/bin/bash

nant.sh -D:deployFile="../Ppamo.BlooCru.zip" -buildfile:build.nant "deploy.setup.bloocru"

