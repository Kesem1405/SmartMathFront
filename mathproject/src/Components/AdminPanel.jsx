import { isAdmin } from './Constants.js';

export function AdminPanel() {
    if (!isAdmin()) {
        return <div>Access Denied</div>;
    }

    return (
        <div>
           ADMIN CONTENT
        </div>
    );
}