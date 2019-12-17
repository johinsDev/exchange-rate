import * as React from "react";

type Action = { type: "add_user"; payload: any };

type Dispatch = (action: Action) => void;

type State = {
  user: { _id: string; name: string; email: string; tokens: string[] };
  isAuth: boolean;
};

type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<State | undefined>(undefined);

const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function UserReducer(state: State, action: Action) {
  switch (action.type) {
    case "add_user": {
      return { user: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(UserReducer, { user: {} });

  const isAuth = state.user && !!state.user._id;

  return (
    <UserStateContext.Provider value={{ ...state, isAuth }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
