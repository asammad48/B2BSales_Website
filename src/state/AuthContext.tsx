import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { authRepository } from '@/repositories/authRepository';
import { clientAuthRepository } from '@/repositories/clientAuthRepository';
import type { ClientInfoDto, LoginRequestDto } from '@/api/generated/apiClient';

type User = {
    id: string;
    email: string;
    name: string;
    tenantId?: string;
    shopId?: string;
    clientId?: string;
    clientInfo?: ClientInfoDto;
};
type AuthState = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginRequestDto) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);
const USER_STORAGE_KEY = 'buyer_user_session';

function readStoredUser(): User | null {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as User;
    } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('buyer_access_token')));
    const [user, setUser] = useState<User | null>(() => readStoredUser());
    const [isLoading, setIsLoading] = useState(true);

    const setSessionUser = (nextUser: User | null) => {
        setUser(nextUser);
        if (nextUser) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
            return;
        }

        localStorage.removeItem(USER_STORAGE_KEY);
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (user) {
                setIsLoading(false);
                return;
            }

            authRepository.me()
                .then((u) => setSessionUser({ id: u.id || '', email: u.email || '', name: u.fullName || '', tenantId: u.tenantId, shopId: u.shopId }))
                .catch(() => {
                    localStorage.removeItem('buyer_access_token');
                    localStorage.removeItem(USER_STORAGE_KEY);
                    setAuthenticated(false);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, user]);

    const login = async (credentials: LoginRequestDto) => {
        const response = await clientAuthRepository.clientLogin(credentials);
        if (!response.accessToken) {
            throw new Error('Missing access token in login response');
        }

        localStorage.setItem('buyer_access_token', response.accessToken);
        setSessionUser({
            id: response.userId || '',
            email: response.clientInfo?.email || credentials.email || '',
            name: response.clientInfo?.name || response.clientInfo?.businessName || '',
            clientId: response.clientId,
            clientInfo: response.clientInfo,
        });
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('buyer_access_token');
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
        setAuthenticated(false);
    };

    const value = useMemo(() => ({
        isAuthenticated,
        setAuthenticated,
        user,
        isLoading,
        login,
        logout
    }), [isAuthenticated, user, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
