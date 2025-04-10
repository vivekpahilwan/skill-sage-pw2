
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import * as supabaseService from '@/services/supabase';

export function useSupabase<T>(
  initialData: T | null = null,
  initialLoading: boolean = false,
  initialError: string | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  const execute = useCallback(async <R>(
    operation: () => Promise<R>,
    {
      loadingMessage = 'Loading...',
      successMessage = 'Operation completed successfully',
      errorMessage = 'Operation failed',
      showSuccessToast = false,
      showErrorToast = true,
      resetData = false
    } = {}
  ): Promise<R | null> => {
    try {
      setIsLoading(true);
      setError(null);
      if (resetData) setData(null);
      
      const result = await operation();
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || errorMessage);
      
      if (showErrorToast) {
        toast.error(err.message || errorMessage);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper to fetch data and set the result
  const fetchData = useCallback(async <R>(
    operation: () => Promise<R>,
    options = {}
  ): Promise<R | null> => {
    const result = await execute<R>(operation, options);
    if (result !== null) {
      setData(result as unknown as T);
    }
    return result;
  }, [execute]);

  return {
    data,
    setData,
    isLoading,
    error,
    execute,
    fetchData,
    service: supabaseService
  };
}
