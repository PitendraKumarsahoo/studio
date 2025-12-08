"use client"

import { useState, useEffect } from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  dismiss: () => void;
  duration?: number;
};

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToastState = {
  toasts: ToasterToast[];
}

const toastStore = {
  state: {
    toasts: [],
  } as ToastState,
  listeners: [] as ((state: ToastState) => void)[],
  
  getState: () => toastStore.state,
  
  setState: (nextState: Partial<ToastState> | ((state: ToastState) => ToastState)) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state)
    } else {
      toastStore.state = { ...toastStore.state, ...nextState }
    }
    
    toastStore.listeners.forEach(listener => listener(toastStore.state))
  },
  
  subscribe: (listener: (state: ToastState) => void) => {
    toastStore.listeners.push(listener)
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener)
    }
  }
}

export const toast = (props: Omit<ToasterToast, 'id' | 'dismiss'>) => {
  const id = generateId()

  const update = (updateProps: Partial<ToasterToast>) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...updateProps } : t
      ),
    }))

  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }))

  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }))

  return {
    id,
    dismiss,
    update,
  }
}

export function useToast() {
  const [state, setState] = useState<ToastState>(toastStore.getState())
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state) => {
      setState(state)
    })
    
    return unsubscribe
  }, [])
  
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    state.toasts.forEach((currentToast) => {
      if (currentToast.duration === Infinity) {
        return
      }

      const timeout = setTimeout(() => {
        currentToast.dismiss()
      }, currentToast.duration || 5000)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [state.toasts])

  return {
    toast,
    toasts: state.toasts,
    dismiss: (toastId?: string) => {
       if(toastId) {
         toastStore.setState((state) => ({
           ...state,
           toasts: state.toasts.filter((t) => t.id !== toastId),
         }))
       } else {
         toastStore.setState({ toasts: [] })
       }
    }
  }
}
