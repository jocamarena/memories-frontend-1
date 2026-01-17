import { NavLink } from 'react-router';

export const Navigation = () => {
    return (
        <nav style={{ marginBottom: '20px' }}>
            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
                <li>
                    <NavLink
                        to="/fetch"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: isActive ? 'underline' : 'none',
                        })}
                    >
                        Fetch
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/axios"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: isActive ? 'underline' : 'none',
                        })}
                    >
                        Axios
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/react-query"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: isActive ? 'underline' : 'none',
                        })}
                    >
                        React Query
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/react-query-spring"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: isActive ? 'underline' : 'none',
                        })}
                    >
                        React Query Spring
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/memory-form"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: isActive ? 'underline' : 'none',
                        })}
                    >
                        Memory Form
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
