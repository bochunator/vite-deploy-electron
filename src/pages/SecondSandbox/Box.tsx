import { useState } from 'react';


interface BoxProps {
    index: string;
    left: number;
    top: number;
    borderRadius?: string;
    boxShadow: string;
    children?: React.ReactNode;
    color: string;
    onClick: (index: string) => void;
    onMove: (index: string, dx: number, dy: number) => void;
}

export default function Box({ index, left, top, borderRadius, boxShadow, children, color, onClick, onMove }: BoxProps) {
    const [lastPointerCoordinates, setLastPointerCoordinates] = useState<null | { clientX: number; clientY: number }>(null);

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        onClick(index);
        (e.currentTarget as HTMLInputElement).setPointerCapture(e.pointerId);
        setLastPointerCoordinates({
            clientX: e.clientX,
            clientY: e.clientY
        });
    }

    function handlePointerMove(e: React.MouseEvent<HTMLDivElement>) {
        if (lastPointerCoordinates) {
            console.log(e)
            const dx = e.clientX - lastPointerCoordinates.clientX;
            const dy = e.clientY - lastPointerCoordinates.clientY;
            onMove(index, dx, dy);
            setLastPointerCoordinates({
                clientX: e.clientX,
                clientY: e.clientY
            });
        }
    }

    function handlePointerUp() {
        setLastPointerCoordinates(null);
    }

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                width: 100,
                height: 100,
                cursor: 'grab',
                backgroundColor: color,
                boxShadow: boxShadow,
                position: 'absolute',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: borderRadius ? borderRadius : undefined,
                transform: `translate(
          ${left}px,
          ${top}px
        )`,
            }}
        >{children}</div>
    );
}
