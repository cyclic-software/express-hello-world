export const queryFactory = (url: string) => () => fetch(url).then((p) => p.json());
