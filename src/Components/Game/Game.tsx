import _ from 'lodash'
import { useEffect, useState } from "react"
import FieldContainer, { Cell } from 'Styles/Game/Game'
import IField from "../Field/IField"
import ISnake from "../Snake/ISnake"

interface Props {
    gameover(): void
}

interface ICell {
    x: number
    y: number
    type: string
}

const Game = ({ gameover: callback }: Props) => {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    let interval: NodeJS.Timer

    const defaultSnake = {
        head: [5, 5],
        body: [1, 2, 2, 2, 2],
        direction: 3
    }

    const defaultField = {
        size: 15,
        apples: [{ x: 10, y: 5 }],
        applesCount: 1
    }

    const [snake, setSnake] = useState<ISnake>(defaultSnake)
    const [field, setField] = useState<IField>(defaultField)
    const [cells, setCells] = useState<Array<ICell>>([])
    let canChangeDirection = true

    const Filling = () => {
        let tempCells = [] as Array<ICell>
        let tempPos = { x: snake.head[0], y: snake.head[1] }
        tempCells.push({ x: tempPos.x, y: tempPos.y, type: 'head' })
        snake.body.forEach(el => {
            switch (el) {
                case 1:
                    tempPos.x = tempPos.x - 1
                    break;
                case 2:
                    tempPos.y = tempPos.y - 1
                    break;
                case 3:
                    tempPos.x = tempPos.x + 1
                    break;
                case 4:
                    tempPos.y = tempPos.y + 1
                    break;
                default:
                    break;
            }
            tempCells.push({ x: tempPos.x, y: tempPos.y, type: 'body' })
        });
        field.apples.forEach(el => {
            tempCells.push({ x: el.x, y: el.y, type: 'apple' })
        });
        setCells(tempCells)
    }

    const CreateNewApple = () => {
        let newApple = { x: getRandomInt(15), y: getRandomInt(15) }
        while (_.find(cells, { x: newApple.x, y: newApple.y })) {
            newApple = { x: getRandomInt(15), y: getRandomInt(15) }
        }
        let tempField = field
        tempField.apples = [newApple]
        setField({ ...tempField })
    }

    const Move = () => {
        let tempSnake = snake
        let tempBody = snake.body
        switch (tempSnake.direction) {
            case 1:
                tempSnake.head[0] = tempSnake.head[0] - 1
                tempBody.unshift(3)
                break;
            case 2:
                tempSnake.head[1] = tempSnake.head[1] - 1
                tempBody.unshift(4)
                break;
            case 3:
                tempSnake.head[0] = tempSnake.head[0] + 1
                tempBody.unshift(1)
                break;
            case 4:
                tempSnake.head[1] = tempSnake.head[1] + 1
                tempBody.unshift(2)
                break;
            default:
                break;
        }
        if (_.find(field.apples, { x: tempSnake.head[0], y: tempSnake.head[1] })) {
            _.filter(field.apples, { x: tempSnake.head[0], y: tempSnake.head[1] })
            CreateNewApple()
        }
        else {
            tempBody.pop()
        }
        if (tempSnake.head[0] <= 0 || tempSnake.head[0] >= field.size + 1 || tempSnake.head[1] <= 0 || tempSnake.head[1] >= field.size + 1 || _.find(cells, {x: tempSnake.head[0], y: tempSnake.head[1]})) {
            callback()
        }
        tempSnake.body = tempBody
        setSnake({ ...tempSnake })
    }

    const NextTurn = () => {
        Move()
        Filling()
        canChangeDirection = true
    }

    const ChangeDirection = (event: KeyboardEvent) => {
        if (canChangeDirection) {
            let tempSnake = snake
            switch (event.keyCode) {
                case 37:
                case 65:
                    if (tempSnake.direction != 3) tempSnake.direction = 1
                    break;
                case 38:
                case 87:
                    if (tempSnake.direction != 4) tempSnake.direction = 2
                    break;
                case 39:
                case 68:
                    if (tempSnake.direction != 1) tempSnake.direction = 3
                    break;
                case 40:
                case 83:
                    if (tempSnake.direction != 2) tempSnake.direction = 4
                    break;
                default:
                    break;
            }
            setSnake({ ...tempSnake })
            canChangeDirection = false
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", ChangeDirection);
        Filling()
        interval = setInterval(NextTurn, 200)
        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", ChangeDirection)
        }
    }, [])


    return (
        <FieldContainer>
            {
                function (size, x, y) {
                    let cell = []
                    while (y <= size) {
                        const tempCell = _.find(cells, { x: x, y: y })
                        cell.push(<Cell key={x + y * 15} type={tempCell ? tempCell.type : null} />)
                        if (x == size) {
                            x = 0
                            y++
                        }
                        x++
                    }
                    return cell
                }(field.size, 1, 1)
            }
        </FieldContainer>
    )
}
export default Game