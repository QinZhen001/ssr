import {createContext, useContext} from 'react';

const DataContext = createContext(null);

export function DataProvider({children, data}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];



export function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read();
  }
  return fakeData;
}
