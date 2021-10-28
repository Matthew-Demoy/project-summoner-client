#!/bin/bash

col_size=8
row_size=8

tutorial_arena=()
tutorial_arena+=("#" "#" "#" "#" "#" "#" "#" "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "." "." "." "." "." "." "#")
tutorial_arena+=("#" "#" "#" "#" "#" "#" "#" "#")

function get_row_n {
    
    row=$1
    row=()
    start_idx=$((row * col_size))
    
    for ((i = 0; i < ${col_size}; i++)); do
        idx=$((start_idx + i))
        row+=(${tutorial_arena[${idx}]})
    done

    
}

arr=()
get_row_n 0
row=("${row[@]}")
for e in ${row[@]}; do
    echo "$e"
done

row[1]="L"
for e in ${row[@]}; do
    echo "$e"
done

tutorial_arena[0]=$row
temp=$tutorial_arena[0]
for e in ${temp}; do
    echo "$e"
done
