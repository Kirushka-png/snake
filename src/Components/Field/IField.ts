export default interface IField{
    size: number
    apples: Array<IApple>
    applesCount: number
}

interface IApple {
    x: number
    y: number
}