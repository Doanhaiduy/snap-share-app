import { Navigate } from "react-router-dom";
const Protected = ({ currentUser, children }) => {
    if (currentUser) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default Protected;
