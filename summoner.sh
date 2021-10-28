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

# X - DEAD
# # - WALL
# $ - Start
# E - Enemy
# A - Ally
# 1 2 ... 4 - Summoner 
# B - Barbarian b - Bard  C - Cleric D - Druid F - Fighter, M - Monk P - Paladin R - Ranger r - rouge S - Sorcerer W - Wizerd


function menu {
    select option in "Create Game" "Start Game" "Tutorial"; do
        clear
        case $option in
        "Tutorial")
            tutorial
            break
            ;;
        *)
            echo "lol"
            ;;
        esac
    done
}

function continue {
    printf "C - Continue"
    printf "    Q - Quit Tutorial \n"

    while true; do
        read -rsn1 input
        clear
        if [ "$input" = "c" ]; then
            break;
        fi
        if [ "$input" = "q" ]; then
            echo "Tutorial Exited"
            menu
            break;
        fi
    done
}


function get_row_n {
    row=$1
    row=()
    start_idx=$((row * col_size))
    
    for ((i = 0; i < ${col_size}; i++)); do
        idx=$((start_idx + i))
        row+=(${tutorial_arena[${idx}]})
    done
}


function tutorial {
    echo "Welcome to the tutorial."
    echo "The following gameplay will be performed locally and cost 0 gas"
    continue
    echo 
    arr=()
    get_row_n 0
    row=("${row[@]}")
    for e in ${row[@]}; do
        echo "$e"
    done
    echo ""
}

#main
echo "Welcome to Project Summoner Alpha"
echo ""
if [ -z "$WALLET_ADDRESS" ]; then
    echo "Please input the public address of your wallet"
    read WALLET_ADDRESS
    readonly
else
    echo "Wallet address is ${WALLET_ADDRESS}"
fi

BALANCE=$(seth balance ${WALLET_ADDRESS})
BALANCE_ETH=$(seth --from-wei ${BALANCE})
echo "Address ${WALLET_ADDRESS} has $(printf '%.f\n' ${BALANCE_ETH}) Fantom"
menu
