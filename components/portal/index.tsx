import { PortalContext } from "@/context/portal";
import React, { useContext, useEffect } from "react";

interface PortalProps {
    children: React.ReactNode,
    name: string
}
const Portal: React.FC<PortalProps> = ({ children, name }) => {
    const { addComponent,removeComponent } = useContext(PortalContext);
    useEffect(() => {
        addComponent({ name, component: children });
        return () => {
            removeComponent(name);
        };
    }, [children, name]);

    return null;
}
export default Portal;
