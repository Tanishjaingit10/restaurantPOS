const localhost = false;

export const TableUIUrl = localhost
    ? "http://localhost:3000"
    : process.env.REACT_APP_TABLE_UI_PUBLIC_URL;

export const BackendUrl = localhost
    ? "http://localhost:4000"
    : process.env.REACT_APP_BACKEND_URL;
