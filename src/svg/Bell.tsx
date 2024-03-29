import * as React from "react"
import Svg, {SvgProps, Path} from "react-native-svg"
import {memo} from "react"

type BellSvgPropsType = {
    color: string
}

const BellSvg = (props: SvgProps & BellSvgPropsType) => (
    <Svg
        width={16}
        height={20}
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8 20c1.1 0 2-.9 2-2H6c0 1.1.9 2 2 2Zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2C9.5 1.17 8.83.5 8 .5S6.5 1.17 6.5 2v.68C3.64 3.36 2 5.92 2 9v5l-2 2v1h16v-1l-2-2Zm-2 1H4V9c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6Z"
            fill={props.color}
        />
    </Svg>
)

const MemoBellSvg = memo(BellSvg)
export default MemoBellSvg