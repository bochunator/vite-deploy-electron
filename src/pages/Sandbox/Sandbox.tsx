import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Box from './Box.js';

const initialPosition = {
    x: 0,
    y: 0
};

interface ShapeTemporaryName {
    id: number;
    color: string;
    position: {
        x: number; y: number
    };
}

export default function Sandbox() {
    const [shapes, setShapes] = useState<ShapeTemporaryName[]>([])
    const [shape, setShape] = useState({
        color: 'orange',
        position: initialPosition
    });
    const [color, setColor] = useState<string>("orange")

    function handleMove(_: number, dx: number, dy: number) {
        setShape(s => ({
            ...s, position: {
                x: s.position.x + dx,
                y: s.position.y + dy
            }
        }))
    }

    function handleColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setShape({
            ...shape,
            color: e.target.value
        });
        setColor(() => e.target.value)
    }

    function handleMoveTemporaryName(index: number, dx: number, dy: number) {
        const nextShapes = shapes.map(s => {
            if (s.id === index) {
                return {...s, position: {x: s.position.x + dx, y: s.position.y + dy}}
            } else {
                return s
            }
        })
        setShapes(nextShapes)
    }

    function handleAdd() {
        setShapes(s => [...s, { id: s.length, color: color, position: { x: 5, y: 5 } }])
    }

    function handleProperties() {
        const newElementHtml = ReactDOMServer.renderToString(shapesItems)
        console.log(newElementHtml)
    }

    const shapesItems = shapes.map(s => <Box index={s.id} key={s.id} color={s.color} position={s.position} onMove={handleMoveTemporaryName}>X</Box>)

    return (
        <>
            <select
                value={shape.color}
                onChange={handleColorChange}
            >
                <option value="orange">orange</option>
                <option value="lightpink">lightpink</option>
                <option value="aliceblue">aliceblue</option>
            </select>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleProperties}>ShowProperties</button>
            {shapesItems}
            <Box
                index={-123}
                color={shape.color}
                position={shape.position}
                onMove={handleMove}
            >
                Drag me!
            </Box>
        </>
    );
}
