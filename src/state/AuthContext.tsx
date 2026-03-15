import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { authRepository } from '@/repositories/authRepository';
import type { LoginRequestDto } from '@/api/generated/apiClient';

type User = { id: string; email: string; name: string; tenantId?: string; shopId?: string };
type AuthState = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginRequestDto) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('buyer_access_token')));
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            authRepository.me()
                .then((u) => setUser({ id: u.id || '', email: u.email || '', name: u.fullName || '', tenantId: u.tenantId, shopId: u.shopId }))
                .catch(() => {
                    localStorage.removeItem('buyer_access_token');
                    setAuthenticated(false);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const login = async (credentials: LoginRequestDto) => {
        const response = await authRepository.login(credentials);
        if (!response.token) {
            throw new Error('Missing access token in login response');
        }

        localStorage.setItem('buyer_access_token', response.token);
        setUser({ id: response.userId || '', email: response.email || '', name: response.fullName || '', tenantId: response.tenantId });
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('buyer_access_token');
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
