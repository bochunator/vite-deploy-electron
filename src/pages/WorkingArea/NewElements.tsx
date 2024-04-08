

interface NewElementsProps {
    addElement: (type: string) => void;
}

const NewElements: React.FC<NewElementsProps> = ({ addElement }) => {
    return (
        <>
            <div onClick={() => addElement("Button")}>Button</div>
            <div onClick={() => addElement("Lamp")}>Lamp</div>
        </>
    )
}

export default NewElements
