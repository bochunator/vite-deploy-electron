

interface ViewProps {
    elements: JSX.Element[];
}

const View: React.FC<ViewProps> = ({ elements }) => {
    return (
        <>{elements}</>
    )
}

export default View
