import { useState } from 'react';


interface BoxProps {
    index: number;
    children?: React.ReactNode;
    color: string;
    position: { x: number; y: number };
    onMove: (index: number, dx: number, dy: number) => void;
}

export default function Box({ index, children, color, position, onMove }: BoxProps) {
    const [lastCoordinates, setLastCoordinates] = useState<null | { x: number; y: number }>(null);

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        (e.currentTarget as HTMLInputElement).setPointerCapture(e.pointerId);
        setLastCoordinates({
            x: e.clientX,
            y: e.clientY,
        });
    }

    function handlePointerMove(e: React.MouseEvent<HTMLDivElement>) {
        if (lastCoordinates) {
            setLastCoordinates({
                x: e.clientX,
                y: e.clientY,
            });
            const dx = e.clientX - lastCoordinates.x;
            const dy = e.clientY - lastCoordinates.y;
            onMove(index, dx, dy);
        }
    }

    function handlePointerUp() {
        setLastCoordinates(null);
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
                position: 'absolute',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
            }}
        >{children}</div>
    );
}
