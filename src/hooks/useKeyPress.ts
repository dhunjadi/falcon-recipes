import {useState, useEffect} from 'react';

export function useKeyPress(targetKey: string): boolean {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
    function downHandler({key}: KeyboardEvent): void {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    const upHandler = ({key}: KeyboardEvent): void => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    // Add event listeners
    useEffect(() => {
        document.addEventListener('keydown', downHandler);
        document.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            document.removeEventListener('keydown', downHandler);
            document.removeEventListener('keyup', upHandler);
        };
    });
    return keyPressed;
}
