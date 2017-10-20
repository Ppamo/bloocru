#!/bin/bash

mono Utils/nant.win-0.92/bin/NAnt.exe -D:deployFile="../Ppamo.BlooCru.zip" -buildfile:build.nant "deploy.setup.ppamo"

