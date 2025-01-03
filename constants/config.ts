const BASE_URL = "http://192.168.4.204:8080";
export const URL = {
    USER: {
        LOGIN: `${BASE_URL}/user/login`,
        SIGNUP: `${BASE_URL}/user/register`,
    },
    BLOGS: {
        GET_ALL_BLOGS: `${BASE_URL}/blogs`,
        GET_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
        CREATE_BLOG: `${BASE_URL}/blog`,
        UPDATE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
        DELETE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
    },
};
