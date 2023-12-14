import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../services/firebaseAuth';

export type ChildrenProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(Boolean(user));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  return !isAuthenticated ? <>{children}</> : null;
}
