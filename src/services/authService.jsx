import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Axiosインスタンスを作成
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // クッキーに認証情報を含める
});

// アクセストークンのリフレッシュを行う関数
const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
        const { access_token } = response.data;
        // 新しいアクセストークンを保存する
    localStorage.setItem('access_token', access_token); // ローカルストレージやセッションストレージに保存する方法を選べます
        return access_token;
    } catch (error) {
        console.error('リフレッシュトークンの取得に失敗しました', error);
        throw error;
    }
};

// リクエストインターセプターでアクセストークンをリクエストヘッダーに追加
api.interceptors.request.use(
    (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

// レスポンスインターセプターでアクセストークン期限切れをチェックし、リフレッシュする
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // アクセストークンが期限切れ（401 Unauthorized）の場合
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
    try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);  // 元のリクエストを再実行
    } catch (refreshError) {
        return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
    }
);

// ログイン関数
export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

// ログアウト関数
export const logout = async () => {
    const response = await api.post('/logout');
    localStorage.removeItem('access_token');
    return response.data;
};

// 新規登録関数
export const register = async (username, email, password) => {
    const response = await api.post('/register', { username, email, password });
    return response.data;
};

// 現在のユーザー情報取得
export const getCurrentUser = async () => {
    const response = await api.get('/current-user');
    return response.data;
};

// 認証状態を確認する関数
export const isAuthenticated = async () => {
    const response = await api.get('/is-authenticated');
    return response.data;
};
