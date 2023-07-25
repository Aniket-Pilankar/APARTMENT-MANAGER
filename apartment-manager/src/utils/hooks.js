import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useRequestDispatch() {
  const _dispatch = useDispatch();

  const dispatch = useCallback(
    (actions, ...args) => Promise.resolve(_dispatch(actions(args[0]))),
    [_dispatch]
  );

  return dispatch;
}
