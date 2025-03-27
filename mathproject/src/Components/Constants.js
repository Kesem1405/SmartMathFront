
export const SERVER_URL = "http://localhost:8080";
export const ADMIN_USERNAME = "ADMIN@ADMIN.COM"
export const ADMIN_PASSWORD = "ADMIN"
export const ADMIN_TOKEN =- "c55fb88bfb0ef042de72760db7a80c2c";


export function isAdmin() {
    return localStorage.getItem("ADMIN") === "true";
}