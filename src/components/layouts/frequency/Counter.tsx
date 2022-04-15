import { animate } from "framer-motion";
import React, { FunctionComponent, useEffect, useRef } from "react";
const Counter: FunctionComponent<{
    from: number,
    to: number,
}> = ({ from, to }) => {
    const nodeRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        const node:any = nodeRef.current;

        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            }
        });

        return () => controls.stop();
    }, [from, to]);


    return <p ref={nodeRef} />;
}

export default Counter