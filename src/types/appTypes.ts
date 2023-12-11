export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface FormData {
  email: string;
  password: string;
}
