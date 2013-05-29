#!/bin/bash


# GET A FRESH VERSION

nant.sh -D:deployFile="../Ppamo.BlooCru.zip" -buildfile:build.nant "deploy.setup.bloocru"

