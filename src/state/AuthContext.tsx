import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { authRepository } from '@/repositories/authRepository';

type User = { id: string; email: string; name: string };
type AuthState = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: User | null;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
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
                .then(u => setUser(u))
                .catch(() => {
                    localStorage.removeItem('buyer_access_token');
                    setAuthenticated(false);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const login = async (credentials: any) => {
        const response = await authRepository.login(credentials);
        localStorage.setItem('buyer_access_token', response.token);
        setUser(response.user);
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
