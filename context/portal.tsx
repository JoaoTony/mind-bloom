import React, { useEffect, useState } from "react";

interface Element {
    name: string;
    component: React.ReactNode;
}
export const PortalContext = React.createContext({
    addComponent: (element: Element) => { },
    removeComponent: (name: string) =>{ }
})


interface PortalProviderProps {
    children: React.ReactNode;
}
interface Element {
    name: string;
    component: React.ReactNode;
}
export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
    const [components, setComponents] = useState<Record<string, React.ReactNode>>({});
    const addComponent = ({ name, component }: Element) => {
        setComponents(prevComponents => ({
            ...prevComponents,
            [name]: component
        }));
    };
    const removeComponent = (name: string) => {
        setComponents(prevComponents => {
            const newComponents = { ...prevComponents };
            delete newComponents[name];
            return newComponents;
        });
    }
    return (
        <PortalContext.Provider value={{ addComponent, removeComponent }}>
            <React.Fragment>
                {children}
            </React.Fragment>
            <React.Fragment>
                {Object.entries(components).map(([name, Component]) => (
                    Component
                ))}
            </React.Fragment>

        </PortalContext.Provider>
    );

}
