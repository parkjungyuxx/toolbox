import { createProxyStore } from "../lib/createProxyStore";

export const counterStore = createProxyStore({ count: 0 });
