import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import Box from './Box.js';

import { v4 as uuidv4 } from 'uuid';


interface ShapeProps {
    id: string;
    left: number;
    top: number;
    borderRadius?: string;
    boxShadow: string;
    color: string;
}

export default function SecondSandbox() {
    // const [shapes, setShapes] = useState<ShapeProps[]>([])
    const [shapes, setShapes] = useState<ShapeProps[]>(() => {
        const storedShapes = localStorage.getItem('shapes');
        return storedShapes ? JSON.parse(storedShapes) : [];
    });
    const [active, setActive] = useState<null | string>(null)
    const [color, setColor] = useState<string>("orange")

    useEffect(() => {
        console.log("PrzedZapisanie [shapes]")
        console.log(shapes)
        console.log("Koniec PrzedZapisania [shapes]")
        if (shapes && shapes.length > 0) {
            const updatedShapes = shapes.map(s => {
                // Tutaj mogę wybrać, które właściwości chcę zachować, a które nie
                // Nie potrzebuje zapisywać cienia, który jest narzucany gdy element jest "aktywny"
                return {
                    ...s,
                    boxShadow: '',
                  };
            });
            console.log("Zapis [shapes]")
            console.log(JSON.stringify(updatedShapes));
            console.log("Koniec zapisu [shapes]")
            localStorage.setItem('shapes', JSON.stringify(updatedShapes));
        }
    }, [shapes]);

    useEffect(() => {
        // Aktualizacja cienia dla obiektów
        const updatedShapes = shapes.map(s => {
            if (s.id === active) {
                // Ustawienie cienia dla aktywnego obiektu
                s.boxShadow = '0 0 10px 5px rgba(0, 0, 255, 0.5)';
                setColor(s.color)
            } else {
                // Usunięcie cienia dla nieaktywnych obiektów
                s.boxShadow = '';
            }
            return s;
        });
        setShapes(updatedShapes);
    }, [active]);


    const handleClickArea = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!event || !event.target) {
            return
        }
        if ((event.target as HTMLDivElement).className === 'temporary') {
            setActive(null)
            console.log('Clicked on div temporary');
            console.log(event)
        } else {
            console.log(`Clicked on sth ${event.target}`);
            console.log(`Clicked on sth ${event.target}`);
        }
    };

    function handleClick(index: string) {
        console.log("KLIKLO SIE w obszar roboczy")
        setActive(() => index)
    }

    function handleColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (active) {
            const nextShapes = shapes.map(s => {
                if (s.id === active) {
                    return { ...s, color: e.target.value }
                } else {
                    return s
                }
            })
            setShapes(nextShapes)
        }
        setColor(() => e.target.value)
    }

    function handleMove(index: string, dx: number, dy: number) {
        const nextShapes = shapes.map(s => {
            if (s.id === index) {
                return { ...s, left: s.left + dx, top: s.top + dy }
            } else {
                return s
            }
        })
        setShapes(nextShapes)
    }

    function handleAdd() {
        setShapes(s => [...s, { left: 5, top: 5, boxShadow: '', id: uuidv4(), color: color, position: { x: 5, y: 5 } }])
    }

    function handleAddCircle() {
        setShapes(s => [...s, { left: 5, top: 5, borderRadius: '50%', boxShadow: '', id: uuidv4(), color: color, position: { x: 5, y: 5 } }])
    }

    function handleProperties() {
        const newElementHtml = ReactDOMServer.renderToString(shapesItems)
        console.log(newElementHtml)
    }

    function handleRemoveShape() {
        if (active !== null) {
            setShapes(s => s.filter((_, i) => s[i].id !== active));
        }
    }

    function handleCleanUp() {
        setShapes([])
    }

    const shapesItems = shapes.map(s => <Box left={s.left} top={s.top} borderRadius={s.borderRadius} boxShadow={s.boxShadow} index={s.id} key={s.id} color={s.color} onMove={handleMove} onClick={handleClick}>X</Box>)

    return (
        <div className='temporary' style={{ height: "1000px" }} onClick={handleClickArea}>
            <select
                value={color}
                onChange={handleColorChange}
            >
                <option value="orange">orange</option>
                <option value="lightpink">lightpink</option>
                <option value="aliceblue">aliceblue</option>
            </select>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleAddCircle}>AddCircle</button>
            <button onClick={handleProperties}>ShowSourceCode</button>
            <button onClick={handleRemoveShape}>Delete</button>
            <button onClick={handleCleanUp}>CleanUpData</button>
            {shapesItems}
        </div>
    );
}
