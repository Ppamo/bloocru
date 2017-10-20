#!/bin/bash

nant -D:deployFile="../Ppamo.BlooCru.zip" -buildfile:build.nant "deploy.setup.bloocru"

