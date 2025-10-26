export type Change = {
  key: string | symbol;
  prev: unknown;
  next: unknown;
};

export type ProxyStore<S extends object> = {
  state: S;
  subscribe: (listener: (state: S, change: Change) => void) => () => void;
};

export function createProxyStore<S extends object>(initial: S): ProxyStore<S> {
  const listeners = new Set<(state: S, change: Change) => void>();

  const proxy = new Proxy(initial, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const prev = Reflect.get(target, key, receiver);
      const changed = !Object.is(prev, value);
      const ok = Reflect.set(target, key, value, receiver);
      if (ok && changed) {
        const change: Change = { key, prev, next: value };
        listeners.forEach((fn) => fn(proxy as S, change))
      }
      return ok
    },
  });

  const subscribe = (listener : (state: S, change: Change) => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {state: proxy as S, subscribe}
  
}

