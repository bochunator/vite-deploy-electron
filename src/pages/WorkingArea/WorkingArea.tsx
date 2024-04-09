import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import NewElements from "./NewElements"
import View from "./View"
import "./WorkingArea.css"


function WorkingArea() {
    const [elements, setElements] = useState<JSX.Element[]>([])
    const [isDragging] = useState(false)
    const [draggedElement] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null)
    const addElement = (name: string) => {
        const newElement = <div
            key={elements.length}
            className={name}
            style={{
                position: 'relative',
                top: '100px',
                left: '100px'
            }}></div>
        const newElementHtml = ReactDOMServer.renderToString(newElement)
        console.log(newElementHtml)
        setElements(prevElements => [...prevElements, newElement])
    }
    useEffect(() => {
        console.log("isDragging:", isDragging);
    }, [isDragging]);

    useEffect(() => {
        console.log("draggedElement:", draggedElement);
    }, [draggedElement]);

    
    return (
        <>
            <div className="working-area">
                <div className="new-elements">
                    <NewElements addElement={addElement} />
                </div>
                <div className="view">
                    <View elements={elements} />
                </div>
                <div className="properties">TRZY</div>
            </div>
        </>
    )
}

export default WorkingArea
