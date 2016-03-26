#!/bin/bash

for jpg in ./$*/*
do
    echo "$jpg"
    convert "$jpg""[1024x>]" "$jpg"
done < "$1"
