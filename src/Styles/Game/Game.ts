import styled from 'styled-components'

const FieldContainer = styled.div`
    width: 300px;
    height: 300px;
    background-color: green;
    display: flex;
    flex-wrap: wrap;
`

interface CellProps{
    type: string | null
}
export const Cell = styled.div<CellProps>`
    width: 20px;
    height: 20px;
    ${({type} : CellProps) => type && (type.includes('head') ? 'background-color:#c242f5 !important;': type.includes('body') ? 'background-color:#7566d1 !important;' : 'background-color:#c7262b !important;')}
    &:nth-child(2n){
        background-color: #388019;
    }
    &:nth-child(2n+1){
        background-color: #55c227;
    }
`

export default FieldContainer