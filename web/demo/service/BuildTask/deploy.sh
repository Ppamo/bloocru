#!/bin/bash

mono Utils/nant.win-0.92/bin/NAnt.exe -D:deployFile="/home/development/svn/TopicSearcher/Deploy/Ppamo.BlooCru.zip" -buildfile:build.nant "deploy"
mono Utils/nant.win-0.92/bin/NAnt.exe -buildfile:build.nant "setup"

