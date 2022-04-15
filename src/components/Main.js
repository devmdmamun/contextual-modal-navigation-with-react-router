import { Link, Outlet, useLocation } from "react-router-dom";

export const Main = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Create contextual modal navigation</h2>
      <Link to="modal" state={{ background: location }}>
        Open Modal
      </Link>
      <Outlet />
    </div>
  );
};
