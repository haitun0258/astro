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

interface resdata {
  userId: string;
  name: string;
  title: string;
  body: string;
}
interface UserStore3 {
  isPending: boolean;
  resdata: resdata;
  setResdataZustand: (num: resdata) => void;
  setIsPendingZustand: (num: boolean) => void;
}
const createUserStore3 = create<UserStore3>((set) => {
  return {
    isPending: false,
    resdata: {
      userId: '',
      name: '',
      title: '',
      body: '',
    },
    setResdataZustand: (num: resdata) => {
      set((state) => ({ resdata: num }))
    },
    setIsPendingZustand: (num: boolean) => {
      set((state) => ({ isPending: num }))
    },
  };
});





export { createUserStore, createUserStore2, createUserStore3 };
