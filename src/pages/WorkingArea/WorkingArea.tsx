import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import NewElements from "./NewElements"
import View from "./View"
import "./WorkingArea.css"


function WorkingArea() {
    const [elements, setElements] = useState<JSX.Element[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [draggedElement, setDraggedElement] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null)
    const addElement = (name: string) => {
        const id = elements.length;
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

    const handleMouseDown = (id: number, offsetX: number, offsetY: number) => {
        console.log(id)
        setIsDragging(() => true)
        setDraggedElement(() => ({ id, offsetX, offsetY }))
    }
    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const { id, offsetX, offsetY } = draggedElement;
            const updatedElements = elements.map((element, index) => {
                if (index === id) {
                    return React.cloneElement(element, {
                        style: {
                            ...element.props.style,
                            top: e.clientY - offsetY,
                            left: e.clientX - offsetX,
                        },
                    });
                }
                return element;
            });
            setElements(updatedElements);
        }
    }
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        /*
        console.log(e);
        setIsDragging(false);
        setDraggedElement(null);
        console.log(isDragging)
        console.log(draggedElement)
      */
    };
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
