import { create } from "zustand";

interface Store {
  count: number;
  inc: (num: number) => void;
}

interface IncNum {
    one: number;
    two: string;
    three: boolean;
}


interface UserStore {
    countwo: IncNum;
    inc: (num: IncNum) => void;
}

const createUserStore = create<Store>((set) => {
  return {
    count: 0,
    inc: (num: number) => {
      set((state) => ({ count: state.count - num }));
    },
  };
});


const createUserStore2 = create<UserStore>((set) => {
    return {
        countwo: {one: 0, two: '', three: false},
        inc: (num: IncNum) => {
            set((state) => ({ countwo: num}));
        },
    };
});





export { createUserStore, createUserStore2 };
