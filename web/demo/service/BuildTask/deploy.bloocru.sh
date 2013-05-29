#!/bin/bash


# GET A FRESH VERSION

mono Utils/nant.win-0.92/bin/NAnt.exe -D:deployFile="../Ppamo.BlooCru.zip" -buildfile:build.nant "deploy.setup"

