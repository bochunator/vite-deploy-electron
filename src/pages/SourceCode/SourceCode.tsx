import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Box from '../SecondSandbox/Box';


interface ShapeProps {
    id: string;
    left: number;
    top: number;
    borderRadius?: string;
    boxShadow: string;
    color: string;
}

function SourceCode() {
    const [shapes] = useState<ShapeProps[]>(() => {
        const storedShapes = localStorage.getItem('shapes');
        return storedShapes ? JSON.parse(storedShapes) : [];
    });

    function handleMove() {
    }

    function handleClick() {
    }

    const shapesItems = shapes.map(s => <Box left={s.left} top={s.top} borderRadius={s.borderRadius} boxShadow={s.boxShadow} index={s.id} key={s.id} color={s.color} onMove={handleMove} onClick={handleClick}>X</Box>)
    const newElementHtml = ReactDOMServer.renderToString(shapesItems)
    const showSourceCode = `<html><head></head><body><${newElementHtml}</body></html>`

    return (
        <>{showSourceCode}</>
    )
}

export default SourceCode
